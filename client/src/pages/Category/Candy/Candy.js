import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import koreanSnacks from "../../../common/image/koreanSnacks2.jpeg";
import {
    ContentList,
    ContentBox,
    ContentTit,
    ContentText,
    LikeCount,
    Pagination,
    BackgroundImageContainer
} from "../../List/List.styled";
import { useListCurrentPageStore, useListPageStore } from '../../../stores/listPageStore';
import Scroll from '../../../components/Scroll/Scroll';
import Gnb from '../../../components/Gnb/Gnb';

const Snacks = () => {
    const navigate = useNavigate();
    const URI = process.env.REACT_APP_API_URL;
    const [ itemList, setItemList ] = useState([]);
    const { listPage, setListPage, setScrollPage } = useListPageStore(state => state);
    const { listCurrentPage, setListCurrentPage } = useListCurrentPageStore(state => state);
    const [totalLength, setTotalLength] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [windowSize, setWindowSize] = useState([window.innerWidth]);
    const PER_PAGE = 12;
    const pageCount = Math.ceil(totalLength / PER_PAGE);

    const handlerPageClick = event => {
        setListCurrentPage(event.selected + 1);
    };

    const handleImageError = e => {
        e.target.src = `https://demofree.sirv.com/nope-not-here.jpg`;
    };

    useEffect(() => {
        axios
          .get(`${URI}/products/category/Candy/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
          .then(res => {
            console.log(res);
            setItemList(res.data.content);
            setTotalLength(res.data.pageInfo.totalElements);
            setTotalPageCount(res.data.pageInfo.totalPages);
          })
          .catch(err => {
            console.log(err);
          });

    const handleWindowResize = () => {
        setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
}, [listCurrentPage]);

const itemOnClickHandler = productId => {
    navigate(`/products/get/${productId}`);
}

return (
    <>
      <BackgroundImageContainer backgroundImage={`url(${koreanSnacks})`}>
        Candy List
      </BackgroundImageContainer>
      <Gnb />
      <div className="bodywrap">

          {windowSize > 768 ? (
            <ContentList>
              {itemList.map((item, idx) => (
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
                <ContentText>₩{item.productPrice}</ContentText>
                <LikeCount>
                  <BsHeartFill /> <p>{item.likes}</p>
                </LikeCount>
              </ContentBox>                
              ))}
            </ContentList>
          ) : (
            <Scroll
              URI={URI}
              page={listPage}
              setPage={setListPage}
              setScrollPage={setScrollPage}
              totalPageCount={totalPageCount}
              setTotalPageCount={setTotalPageCount}
              windowSize={windowSize}
              handleImageError={handleImageError}
              itemOnClickHandler={itemOnClickHandler}
            />
          )}

          {/* Pagination */}
          <Pagination>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlerPageClick}
              containerClassName=""
              subContainerClassName=""
              activeClassName="active"
              forcePage={listCurrentPage - 1}
            />
          </Pagination>
      </div>
    </>
  );
}

export default Snacks;