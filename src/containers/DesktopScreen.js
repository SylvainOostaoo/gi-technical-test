import { h } from "preact";
/** @jsx h */

function DesktopScreen({
  albums,
  currentAlbum,
  currentPhoto,
  previousPhoto,
  nextPhoto
}) {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <button
        onClick={previousPhoto}
        disabled={currentPhoto === 0 ? true : false}
      >
        -
      </button>
      <img
        src={albums[currentAlbum][currentPhoto].url}
        alt={albums[currentAlbum][currentPhoto].title}
        style={{ objectFit: "cover" }}
      />
      <button
        onClick={nextPhoto}
        disabled={
          currentPhoto === albums[currentAlbum].length - 1 ? true : false
        }
      >
        +
      </button>
    </div>
  );
}

export default DesktopScreen;
