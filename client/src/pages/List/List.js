import { useState, useEffect } from "react";
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from 'react-icons/bs';

import {
  ContentList,
  ContentBox,
  ContentTit,
  ContentText,
  LikeCount,
  Pagination,
  BackgroundImage
} from "./List.styled";

import {
  useSearchApiStore,
  useSearchIsUpdateStore,
  useSearchSelectedStore,
  useSearchTextStore,
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
  const { searchText, setSearchText } = useSearchTextStore(state => state);
  const { searchSelected } = useSearchSelectedStore(state => state);
  const { searchIsUpdate, setSearchIsUpdate } = useSearchIsUpdateStore(state => state);
  const { searchApi } = useSearchApiStore(state => state);
  const [itemList, setItemList] = useState([]);
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
    if (searchText === '') {
      axios
        .get(`${URI}/products/search?/page=${listCurrentPage}&pageSize=${PER_PAGE}`)
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
          .get(`${URI}/products/${searchSelected}?${searchApi}=${searchText}&page=${listCurrentPage}&pageSize=${PER_PAGE}`)
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
    
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [listCurrentPage, searchText, searchApi, searchSelected]);

  const itemOnClickHandler = productId => {
    navigate(`/get/${productId}`);
  };

  return (
    <>
      <BackgroundImage>
        <div>Product List</div>
      </BackgroundImage>
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
                  src={item.img}
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
              searchSelected={searchSelected}
              searchApi={searchApi}
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