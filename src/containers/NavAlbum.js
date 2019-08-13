import { h } from "preact";
/** @jsx h */

function NavAlbum({
  previousAlbum,
  previousDisabled,
  nextAlbum,
  nextDisabled,
  albumName
}) {
  return (
    <nav style={{ display: "flex" }}>
      <button onClick={() => previousAlbum()} disabled={previousDisabled}>
        -
      </button>
      <div>Album "{albumName}"</div>
      <button onClick={() => nextAlbum()} disabled={nextDisabled}>
        +
      </button>
    </nav>
  );
}

export default NavAlbum;
