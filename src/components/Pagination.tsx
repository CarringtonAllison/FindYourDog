interface PaginationProps {
  prevQuery: string | null ;
  nextQuery: string | null ;
  pageCount: number ;
  total: number;
  size: number;
  handlePageChange:(direction: "next" | "prev") => void; 
}

const Pagination = ({
  prevQuery,
  nextQuery,
  pageCount,
  total,
  size,
  handlePageChange,
}: PaginationProps) => {
  return (
    <div className="justify-self-center">
      <button onClick={() => handlePageChange("prev")} disabled={!prevQuery}>
        Previous
      </button>
      <span className="mx-4">
        Page {pageCount} of {Math.ceil(total / size)}
      </span>
      <button onClick={() => handlePageChange("next")} disabled={!nextQuery}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
