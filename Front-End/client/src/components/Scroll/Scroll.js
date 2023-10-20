import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { MdRecommend } from 'react-icons/md';
import {
    ContentList,
    ContentBox,
    ContentTit,
    ContentText,
    LikeCount,
} from './Scroll.styled';

const Scroll = ({
    URI,
    page,
    searchText,
    searchSelected,
    setTotalPageCount,
    windowSize,
    handleImageError,
    itemOnClickHandler,
    setScrollPage,
}) => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const pageEnd = useRef();
    const loadMore = () => {
        setScrollPage(page + 1);
    };
    const fetchPins = async page => {
        if (searchText === '') {
            await axios
              .get(`${URI}/products/search?page=${page}&pageSize=20`)
              .then(res => {
                setTotalPageCount(res.data.pageInfo.totalPages);
                if (page === 1) {
                    setPins(() => [...res.data.content]);
                } else {
                    setPins(prev => [...prev, ...res.data.content]);
                }
                setLoading(!(page === res.data.pageInfo.totalPages));
              })
              .catch(err => console.log(err));
        } else {
            await axios
              .get(`${URI}/products/search?productName=${searchText}page=${page}&pageSize=20`)
              .then(res => {
                if (!res.data) {
                    setPins([]);
                } else {
                    setTotalPageCount(res.data.pageInfo.totalPages);
                    if (page === 1) {
                        setPins(() => [...res.data.data]);
                    } else {
                        setPins(prev => [...prev, ...res.data.content]);
                    }
                    setLoading(!(page === res.data.pageInfo.totalPages));
                }
              })
              .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        fetchPins(page);
    }, [page, searchText, searchSelected]);
    useEffect(() => {
        if (windowSize <= 768) {
            let observer;
            if (loading) {
                observer = new IntersectionObserver(
                    entries => {
                        if (entries[0].isIntersecting) {
                            loadMore();
                        }
                    },
                    {
                        threshold: 0.4,
                    },
                );
                observer.observe(pageEnd.current);
            }
            return () => observer && observer.disconnect();
        }
    }, [loading]);

    return (
        <ContentList>
            {pins.map((item, idx) => (
                <ContentBox
                  key={idx}
                  onClick={() => itemOnClickHandler(item.id)}
                >
                <img
                  src={item.img}
                  alt={item.productName}
                  onError={handleImageError}
                />                
                <ContentTit>{item.productName}</ContentTit>
                <ContentText>{item.content}</ContentText>
                <LikeCount>
                    <MdRecommend /> <p>{item.likes}</p>
                </LikeCount>                   
                </ContentBox>
            ))}
            {loading ? (
                <div ref={pageEnd} className="page-end">
                    <span>{}</span>
                    <span>{}</span>
                    <span>{}</span>
                </div>
            ) : null}
        </ContentList>
    );
};

export default Scroll;