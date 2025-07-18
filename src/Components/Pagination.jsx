import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from "react-icons/fa";
export default function Pagination({ currentPage, setCurrentPage, lastPage }) {
  function goToPage(page) {
    let selectedPage = Math.max(1, Math.min(page, lastPage));
    setCurrentPage(selectedPage);
  }
  function getPageNumbers() {
    if (currentPage <= 3) return [1, 2, 3, 4];
    if (currentPage >= lastPage - 2)
      return [lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }
  return (
    <div className="w-full my-5 flex items-center justify-center gap-2.5 flex-wrap">
      <FaAngleDoubleLeft
        onClick={() => goToPage(1)}
        className="pagination-button"
      />
      <FaAngleLeft
        onClick={() => goToPage(currentPage - 1)}
        className="pagination-button"
      />
      {getPageNumbers().map((num,index) => (
        <button key={index}
          onClick={() => goToPage(num)}
          className={`pagination-button ${
            currentPage == num ? "bg-accent text-primary" : ""
          }`}
        >
          {num}
        </button>
      ))}
      <FaAngleRight
        onClick={() => goToPage(currentPage + 1)}
        className="pagination-button"
      />
      <FaAngleDoubleRight
        onClick={() => goToPage(lastPage)}
        className="pagination-button"
      />
    </div>
  );
}
