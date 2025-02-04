import React from "react";
import "../Pagination.css";

interface PageButtonsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PageButtons: React.FC<PageButtonsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > totalPages) {
      setCurrentPage(1);
    } else if (newPage < 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    
    return pages;
  };

  return (
    <div className="pagination-container">
      <button 
        className="nav-button"
        onClick={() => handlePageChange(currentPage === 1 ? totalPages : 1)}
      >
        &lt;&lt;
      </button>
      <button 
        className="nav-button"
        onClick={() => handlePageChange(currentPage === 1 ? totalPages : currentPage - 1)}
      >
        &lt;
      </button>


      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}


      <button 
        className="nav-button"
        onClick={() => handlePageChange(currentPage === totalPages ? 1 : currentPage + 1)}
      >
        &gt;
      </button>
      <button 
        className="nav-button"
        onClick={() => handlePageChange(currentPage === totalPages ? 1 : totalPages)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default PageButtons;