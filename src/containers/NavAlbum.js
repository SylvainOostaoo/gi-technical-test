import { h } from "preact";
/** @jsx h */

function NavAlbum({
  albums,
  currentAlbum,
  previousAlbum,
  nextAlbum,
  albumName
}) {
  return (
    <nav class="nav-album">
      <button
        onClick={() => previousAlbum()}
        disabled={currentAlbum === 0 ? true : false}
        class="nav-album-button"
      >
        &larr;
      </button>
      <div>Album "{albumName}"</div>
      <button
        onClick={() => nextAlbum()}
        disabled={currentAlbum === albums.length - 1 ? true : false}
        class="nav-album-button"
      >
        &rarr;
      </button>
    </nav>
  );
}

export default NavAlbum;
