
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
      if (newPage < 1 || newPage > totalPages) return;
      setCurrentPage(newPage);
    };
  
    const getPageNumbers = () => {
      let pages = [];
      if (currentPage < 3) {
        pages = [1, 2, 3, "...", totalPages - 1, totalPages];
      } 
      else if (currentPage >= totalPages - 2) 
        {
        pages = [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
      } else 
      {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
      return pages;
    };
  
    return (
      <div className="pagination-container">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
  
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="dots">...</span>
          )
        )}
  
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
      </div>
    );
  };
  
  export default PageButtons;