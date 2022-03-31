const Pagination = ({ numOfPages, onClick, currentPage }) => {
  return (
    <div className="flex flex-row p-1 m-1 justify-center">
      {numOfPages.map((number, index) => {
        const activeStyle = currentPage === number ? { color: "red" } : {};
        return (
          <button
            onClick={onClick(number)}
            key={index}
            className="p-1 m-1 text-lg"
          >
            <p style={activeStyle}>{number}</p>
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
