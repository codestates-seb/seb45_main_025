import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {
  FcFilledFilter
} from "react-icons/fc";

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

} from './CommunityList.styled';



function CommunityList() {
  const URI = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
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


  return (
    <Container>
      <Line />
      <Title>Community</Title>

      <PostButtonContainer>
        <Filter>
          <FcFilledFilter style={{ fontSize: '23px', cursor: 'pointer' }} />


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
            . {item.title} [{item.countComment}]
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
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하세요"
      />
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