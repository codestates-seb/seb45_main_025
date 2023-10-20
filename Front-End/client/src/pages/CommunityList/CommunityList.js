// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import ReactPaginate from "react-paginate";
// // import {
// //   FcFilledFilter
// // } from "react-icons/fc";

// import {
//   Container,
//   Line,
//   Title,
//   Input,
//   ListItem,
//   PostButtonContainer,
//   ListItemTitle,
//   ListItemDetails,
//   PaginationContainer,
//   PostButton,
//   Filter,
//   StyledButton,
//   DropdownContent,
//   SearchContainer,
//   SearchButton
// } from './CommunityList.styled';



// function CommunityList() {
//   const URI = process.env.REACT_APP_API_URL;

//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalElements, setTotalElements] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 상태 이름 수정
//   const handleSearchClick = () => {
//     // SearchButton를 클릭했을 때 검색 실행
//     fetchData();
//   };
//   const handlePageClick = (selectedPage) => {
//     setCurrentPage(selectedPage.selected + 1);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);

//   };
//   const handleInputKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handlePageClick()
//     }
//   };

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${URI}/board/posts?search=${searchTerm}&page=${currentPage}`
//       );

//       setData(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setTotalElements(response.data.totalElements);
//     } catch (error) {
//       console.error('에러 발생:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [URI, currentPage]);

//   const navigateToWritePost = () => {
//     navigate('/WritePost');
//   };

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     if (isNaN(date)) {
//       return "Invalid Date";
//     }
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString(undefined, options);
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };


//   return (
//     <Container>
//       <Line />
//       <Title>Community</Title>

//       <PostButtonContainer>
//         <Filter>
//           <StyledButton onClick={toggleDropdown}>filter</StyledButton>
//           {isDropdownOpen && (
//             <>
//               <DropdownContent>
//                 <button type="button">latest</button>
//                 <button type="button">oldest</button>
//                 <button type="button">view</button>
//                 <button type="button">항목 4</button>
//               </DropdownContent>
//             </>
//           )}
//         </Filter>
//       </PostButtonContainer>

//       {data.map((item, index) => (
//         <ListItem
//           key={item.boardId}
//           role="button"
//           tabIndex={0}
//           onClick={() => navigate(`/CommunityBoard/${item.boardId}`)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               navigate(`/CommunityBoard/${item.boardId}`);
//             }
//           }}
//         >
//           <ListItemTitle>
//             {(totalElements - (currentPage - 1) * 10) - index}
//             . {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title} [{item.countComment}]
//           </ListItemTitle>
//           <Link to={`/CommunityBoard/${item.boardID}`}></Link>
//           <ListItemDetails>
//             작성자: {item.author} | 작성일: {formatDate(item.createAt)} | 조회수: {item.view}
//           </ListItemDetails>
//         </ListItem>
//       ))}

//       <PostButtonContainer>
//         <PostButton onClick={navigateToWritePost}>Post</PostButton>
//       </PostButtonContainer>
//       <SearchContainer>
//         <Input
//           type="text"
//           value={searchTerm}
//           onChange={(event) => handleSearchChange(event)}
//           placeholder="검색어를 입력하세요"
//           onKeyDown={(event) => handleInputKeyPress(event)}
//         />
//         <SearchButton onClick={handleSearchClick}>Search</SearchButton>
//       </SearchContainer>


//       <PaginationContainer>
//         <ReactPaginate
//           previousLabel="<"
//           nextLabel=">"
//           breakLabel="..."
//           pageCount={totalPages}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName="pagination"
//           subContainerClassName="pages pagination"
//           activeClassName="active"
//           forcePage={currentPage - 1}
//         />

//       </PaginationContainer>
//     </Container>
//   );
// }

// export default CommunityList;

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { PiFunnel } from 'react-icons/pi';
import {
  Container,
  Input,
  ListItem,
  PostButtonContainer,
  ListItemTitle,
  ListItemDetails,
  PaginationContainer,
  PostButton,
  Filter,
  SearchContainer,
  SearchButton,
  DropdownContainer,
  DropdownButton,
  DropdownOptions,
  DropdownOption,
  Icon,
  ListItemNumber,
  BackgroundImageContainer,
  // ListItemComment

} from './CommunityList.styled';
import CommunityBack from '../../common/image/CommunityBack.webp';

function CommunityList() {
  const URI = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortType, setSortType] = useState('latest');

  const handleSearchClick = () => {
    fetchData();
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchClick();
    }
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${URI}/board/posts?search=${searchTerm}&page=${currentPage}&sortType=${sortType}`
      );

      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [URI, currentPage, sortType]);

  const navigateToWritePost = () => {
    navigate('/WritePost');
    window.scroll(0, 0);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortTypeChange = (type) => {
    setSortType(type);
    setIsDropdownOpen(false); // 아이템 선택 시 드롭다운 닫기
  };

  return (
    <>
      <BackgroundImageContainer backgroundImage={`url(${CommunityBack})`}>
        Community
      </BackgroundImageContainer>
      <Container>
        <SearchContainer>
          <Input
            type="text"
            value={searchTerm}
            onChange={(event) => handleSearchChange(event)}
            placeholder=""
            onKeyDown={(event) => handleInputKeyPress(event)}
          />
          <SearchButton onClick={handleSearchClick}>Search</SearchButton>
        </SearchContainer>
        <PostButtonContainer>
          <Filter>
            <DropdownContainer>

              <DropdownButton onClick={toggleDropdown}>
                <Icon>
                  <PiFunnel className="icon" />
                </Icon>{sortType}
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownOptions>
                  {['latest', 'oldest', 'popular'].map((type) => (
                    <DropdownOption
                      key={type}
                      onClick={() => handleSortTypeChange(type)}
                    >
                      {type}
                    </DropdownOption>
                  ))}
                </DropdownOptions>
              )}
            </DropdownContainer>
          </Filter>
        </PostButtonContainer>

        {data.map((item, index) => (
          <ListItem
            key={item.boardId}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/CommunityBoard/${item.boardId}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/CommunityBoard/${item.boardId}`);
              }
            }}
          >
            <ListItemNumber>{(totalElements - (currentPage - 1) * 10) - index}.</ListItemNumber>
            <ListItemTitle>
              {item.title.length > 25 ? `${item.title.slice(0, 25)}...` : item.title}
            </ListItemTitle>

            <Link to={`/CommunityBoard/${item.boardID}`}></Link>
            <ListItemDetails>
              Author: {item.author} | Date: {formatDate(item.createAt)} | Views: {item.view} | Comments: {item.countComment}
            </ListItemDetails>
            {/* <ListItemComment></ListItemComment> */}
          </ListItem>
        ))}

        <PostButtonContainer>
          <PostButton onClick={navigateToWritePost}>Post</PostButton>
        </PostButtonContainer>
        <PaginationContainer>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        </PaginationContainer>
      </Container>
    </>
  );
}

export default CommunityList;
