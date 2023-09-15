import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CommunityList() {
  const URI = process.env.REACT_APP_API_URL;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URI}/board/posts?search=${searchTerm}`);
      setData(response.data.content);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, [URI, currentPage, searchTerm]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
    <div
      style={{
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          height: '2px',
          width: '40px',
          backgroundColor: '#FFA500',
          zIndex: 2
        }}
      ></div>
      <div
        style={{
          height: '70px',
          width: '300px',
          backgroundColor: 'white',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          paddingBottom: '40px',
          paddingTop: '35px',
          fontSize: '2.5rem'
        }}
      >
        Community
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하세요"
        style={{ width: '180px', marginBottom: '10px', padding: '5px' }}
      />

      {data.map((item) => (
        <div
          key={item.boardID}
          role="button"
          tabIndex={0}
          style={{
            marginBottom: '-2px',
            padding: '10px',
            backgroundColor: 'white',
            width: '70%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid gray',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/CommunityBoard/${item.boardID}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(`/CommunityBoard/${item.boardID}`);
            }
          }}
        >
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {item.title} [{item.countComment}]
          </div>
          <div style={{ fontSize: '0.8rem', color: 'gray' }}>
            작성자: {item.author} | 작성일: {formatDate(item.createAt)} | 조회수: {item.view}
          </div>
        </div>
      ))}

      <div
        style={{
          height: '50px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px'
        }}
      >
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 5)}
            disabled={currentPage - 5 < 1}
            style={{ marginRight: '5px' }}
          >
            &#171;
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: '10px' }}
          >
            이전
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: Math.ceil(totalPages / 5) }).map(
              (_, groupIndex) => {
                const startPage = groupIndex * 5 + 1;
                const endPage = Math.min(startPage + 4, totalPages);

                if (currentPage >= startPage && currentPage <= endPage) {
                  return (
                    <div
                      key={groupIndex}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {Array.from({ length: endPage - startPage + 1 }).map(
                        (_, pageIndex) => {
                          const pageNumber = startPage + pageIndex;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              style={{
                                marginRight: '5px',
                                fontWeight:
                                  currentPage === pageNumber ? 'bold' : 'normal'
                              }}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              }
            )}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ marginLeft: '10px' }}
          >
            다음
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 5)}
            disabled={currentPage + 5 > totalPages}
            style={{ marginLeft: '5px' }}
          >
            &#187;
          </button>
          <button
            onClick={navigateToWritePost}
            style={{
              padding: '10px',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityList;
