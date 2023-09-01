import { useState } from 'react';

function CommunityList() {
  const itemsPerPage = 10;
  const totalItems = 200;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const mockData = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const searchTermRegex = new RegExp(escapedSearchTerm, 'i');
  const filteredItems = mockData.filter(item => searchTermRegex.test(item));

  const totalFilteredItems = filteredItems.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalFilteredItems - 1);
  const renderedItems = filteredItems.slice(startIndex, endIndex + 1);

  return (

    <div style={{ height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          height: '2px',
          width: '40px',
          backgroundColor: '#FFA500',
          zIndex: 2,
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
          fontSize: '30px'
        }}
      >
        Community
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하여주세요"
        style={{ width: '180px', marginBottom: '10px', padding: '5px' }}
      />
      {renderedItems.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: '-2px',
            padding: '10px',
            backgroundColor: 'white',
            width: '70%',
            textAlign: 'left',
            border: '1px solid gray',
          }}
        >
          {index + startIndex + 1}. {item}
        </div>
      ))}

      {/* 페이지네이션 버튼 */}
      <div style={{ height: '50px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <button onClick={() => setCurrentPage(currentPage - 5)} disabled={currentPage - 5 < 1} style={{ marginRight: '5px' }}>
            &#171;
          </button>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ marginRight: '10px' }}>
            이전
          </button>
          {/* 페이지 5씩묶음 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: Math.ceil(totalPages / 5) }).map((_, groupIndex) => {
              const startPage = groupIndex * 5 + 1;
              const endPage = Math.min(startPage + 4, totalPages);

              if (currentPage >= startPage && currentPage <= endPage) {
                return (
                  <div key={groupIndex} style={{ display: 'flex', alignItems: 'center' }}>
                    {Array.from({ length: endPage - startPage + 1 }).map((_, pageIndex) => {
                      const pageNumber = startPage + pageIndex;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          style={{
                            marginRight: '5px',
                            fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                          }}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>

          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
            다음
          </button>
          <button onClick={() => setCurrentPage(currentPage + 5)} disabled={currentPage + 5 > totalPages} style={{ marginLeft: '5px' }}>
            &#187;
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommunityList;
