import { h } from "preact";
/** @jsx h */

function Pagination({
  albums,
  currentAlbum,
  currentPage,
  photosPerPage,
  handleChangePage
}) {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(albums[currentAlbum].length / photosPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleChangePage}
        class={"page-number " + (currentPage === number ? "current-page" : "")}
      >
        {number}
      </li>
    );
  });
  return <ul class="pagination">Pages : {renderPageNumbers}</ul>;
}

export default Pagination;
