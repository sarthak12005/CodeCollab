export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 5,
  totalItems = 0,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);


  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {/* INFO */}
      <p className="text-sm text-gray-400">
        Showing <span className="font-medium text-white">{startItem}</span>–
        <span className="font-medium text-white">{endItem}</span> of{" "}
        <span className="font-medium text-white">{totalItems}</span> users
      </p>

      {/* CONTROLS */}
      <div className="flex items-center gap-2">
        {/* PREV */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            px-3 py-2 rounded-md text-sm font-medium
            bg-gray-700 text-gray-300
            hover:bg-gray-600 hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          ←
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, currentPage - 2) + i;
            if (pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  w-9 h-9 rounded-md text-sm font-medium
                  transition
                  ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* NEXT */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            px-3 py-2 rounded-md text-sm font-medium
            bg-gray-700 text-gray-300
            hover:bg-gray-600 hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;