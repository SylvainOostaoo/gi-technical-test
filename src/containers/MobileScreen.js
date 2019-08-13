import { h } from "preact";
/** @jsx h */

import Pagination from "../components/Pagination";

function MobileScreen({ albums, currentAlbum, currentPage, handleChangePage }) {
  const photosPerPage = 5;

  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const photos = albums[currentAlbum].slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  );

  return (
    <div>
      <Pagination
        albums={albums}
        currentAlbum={currentAlbum}
        currentPage={currentPage}
        photosPerPage={photosPerPage}
        handleChangePage={handleChangePage}
      />
      {photos.map(photo => (
        <img src={photo.url} alt={photo.title} class="img-mobile" />
      ))}

      <Pagination
        albums={albums}
        currentAlbum={currentAlbum}
        currentPage={currentPage}
        photosPerPage={photosPerPage}
        handleChangePage={handleChangePage}
      />
    </div>
  );
}

export default MobileScreen;
