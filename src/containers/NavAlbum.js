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
    <nav style={{ display: "flex" }}>
      <button
        onClick={() => previousAlbum()}
        disabled={currentAlbum === 0 ? true : false}
      >
        -
      </button>
      <div>Album "{albumName}"</div>
      <button
        onClick={() => nextAlbum()}
        disabled={currentAlbum === albums.length - 1 ? true : false}
      >
        +
      </button>
    </nav>
  );
}

export default NavAlbum;
