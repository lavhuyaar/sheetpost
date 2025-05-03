import { SetStateAction } from "react";

interface IPagination {
  totalDataLength: number;
  limit: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  className?: string;
}

const Pagination = ({
  totalDataLength,
  limit,
  currentPage,
  setCurrentPage,
  className,
}: IPagination) => {
  const totalPages: number = Math.ceil(totalDataLength / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //Renders button with page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${
            currentPage === i
              ? "bg-primary text-primary-txt"
              : "bg-transparent text-primary"
          } cursor-pointer hover:bg-primary hover:text-primary-txt py-1 px-2 rounded-md transition`}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-4 justify-center ${
        className || ""
      }`}
    >
      {/* Pagination Controls */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="primary-btn"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="primary-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
