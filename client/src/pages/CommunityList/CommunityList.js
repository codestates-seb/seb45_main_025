import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate";
// import {
//   FcFilledFilter
// } from "react-icons/fc";

import {
  Container,
  Line,
  Title,
  Input,
  ListItem,
  PostButtonContainer,
  ListItemTitle,
  ListItemDetails,
  PaginationContainer,
  PostButton,
  Filter,
  StyledButton,
  DropdownContent,
  SearchContainer,
  SearchButton
} from './CommunityList.styled';



function CommunityList() {
  const URI = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 상태 이름 수정
  const handleSearchClick = () => {
    // SearchButton를 클릭했을 때 검색 실행
    fetchData();
  };
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${URI}/board/posts?search=${searchTerm}&page=${currentPage}`
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
  }, [URI, currentPage, searchTerm]);

  const navigateToWritePost = () => {
    navigate('/WritePost');
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
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchData();
    }
  };

  return (
    <Container>
      <Line />
      <Title>Community</Title>

      <PostButtonContainer>
        <Filter>
          <StyledButton onClick={toggleDropdown}>filter</StyledButton>
          {isDropdownOpen && (
            <>
              <DropdownContent>
                <button type="button">latest</button>
                <button type="button">oldest</button>
                <button type="button">view</button>
                <button type="button">항목 4</button>
              </DropdownContent>
            </>
          )}
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
          <ListItemTitle>
            {(totalElements - (currentPage - 1) * 10) - index}
            . {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title} [{item.countComment}]
          </ListItemTitle>
          <Link to={`/CommunityBoard/${item.boardID}`}></Link>
          <ListItemDetails>
            작성자: {item.author} | 작성일: {formatDate(item.createAt)} | 조회수: {item.view}
          </ListItemDetails>
        </ListItem>
      ))}

      <PostButtonContainer>
        <PostButton onClick={navigateToWritePost}>Post</PostButton>
      </PostButtonContainer>
      <SearchContainer>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어를 입력하세요"
          onKeyDown={handleInputKeyPress}
        />
        <SearchButton onClick={handleSearchClick}>Search</SearchButton>
      </SearchContainer>


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
  );
}

export default CommunityList;