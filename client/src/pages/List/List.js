import { useState, useEffect } from "react";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';
import koreanSnacks from '../../common/image/koreanSnacks2.jpeg';

import {
  ContentList,
  ContentBox,
  ContentTit,
  ContentText,
  LikeCount,
  Pagination,
  BackgroundImageContainer,
} from "./List.styled";

import {
  useSearchIsUpdateStore,
  useSearchTextStore,
  useSearchCategoryStore,
  useSearchSelectedCategoryStore,
} from '../../stores/listSearchStore'

import {
  useListCurrentPageStore,
  useListPageStore,
} from "../../stores/listPageStore";

import Scroll from "../../components/Scroll/Scroll";
import Gnb from "../../components/Gnb/Gnb";
import Search from "../../components/Search/Search";

const List = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  const { searchText } = useSearchTextStore(state => state);
  const { searchIsUpdate, setSearchIsUpdate } = useSearchIsUpdateStore(state => state);  
  const [itemList, setItemList] = useState([]);
  const { searchCategory, setSearchCategory } = useSearchCategoryStore(state => state);
  const { searchSelectedCategory } = useSearchSelectedCategoryStore(state => state);
  const { listPage, setListPage, setScrollPage } = useListPageStore(state => state);
  const { listCurrentPage, setListCurrentPage } = useListCurrentPageStore(state => state);
  const [totalLength, setTotalLength] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  const PER_PAGE = 20;
  const pageCount = Math.ceil(totalLength / PER_PAGE);

  const handlerPageClick = event => {
    setListCurrentPage(event.selected + 1);
    setSearchIsUpdate(true);
  };

  const handleImageError = e => {
    e.target.src = 'https://demofree.sirv.com/nope-not-here.jpg';
  };

  useEffect(() => {
    console.log(setSearchCategory);

    if ( searchCategory === 'all') {
      axios
        .get(`${URI}/products/all/list?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });      
      if (searchText === '') {
        axios
          .get(`${URI}/products/search?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
          .then(res => {
            console.log(res);
            setItemList(res.data.data);
            setTotalLength(res.data.pageInfo.totalElements);
            setTotalPageCount(res.data.pageInfo.totalPages);
            setSearchIsUpdate(false);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        if (searchIsUpdate === true) {
          axios
            .get(`${URI}/products/search?productName=${searchText}page=${listCurrentPage}&pageSize=${PER_PAGE}`)
            .then(res => {
              if (!res.data) {
                setItemList([]);
                setTotalLength(0);
                setTotalPageCount(0);
              } else {
                console.log(res);
                setItemList(res.data.data);
                setTotalLength(res.data.pageInfo.totalElements);
                setTotalPageCount(res.data.pageInfo.totalPages);
              }
              setSearchIsUpdate(false);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } 
    } else if (searchCategory === 'Snacks') {
      axios
        .get(`{URI}/products/category/${searchSelectedCategory}/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (searchCategory === 'Cookies') {
      axios
        .get(`{URI}/products/category/${searchSelectedCategory}/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (searchCategory === 'Chocolate') {
      axios
        .get(`{URI}/products/category/${searchSelectedCategory}/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (searchCategory === 'Candy') {
      axios
        .get(`{URI}/products/category/${searchSelectedCategory}/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (searchCategory === 'Jelly') {
      axios
        .get(`{URI}/products/category/${searchSelectedCategory}/?page=${listCurrentPage}&pageSize=${PER_PAGE}`)
        .then(res => {
          console.log(res);
          setItemList(res.data.data);
          setTotalLength(res.data.pageInfo.totalElements);
          setTotalPageCount(res.data.pageInfo.totalPages);
          setSearchIsUpdate(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [listCurrentPage, searchText, searchCategory, searchSelectedCategory]);

  const itemOnClickHandler = productId => {
    navigate(`/products/get/${productId}`);
  };

  return (
    <>
      <BackgroundImageContainer backgroundImage={`url(${koreanSnacks})`}>
        Product List
      </BackgroundImageContainer>
      <Gnb />
      <div className="bodywrap">
      <Search />

          {windowSize > 768 ? (
            <ContentList>
              {itemList.map((item, idx) => (
                <ContentBox
                key={idx}
                onClick={() => itemOnClickHandler(item.id)}
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  onError={handleImageError}
                />
                <ContentTit>{item.productName}</ContentTit>
                <ContentText>${item.productPrice}</ContentText>
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
              searchText={searchText}
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
};

export default List;