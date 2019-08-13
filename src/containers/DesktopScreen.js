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
    <div style={{ display: "flex" }}>
      <button
        onClick={previousPhoto}
        disabled={currentPhoto === 0 ? true : false}
        class="desktop-button"
      >
        &larr;
      </button>
      <img
        src={albums[currentAlbum][currentPhoto].url}
        alt={albums[currentAlbum][currentPhoto].title}
      />
      <button
        onClick={nextPhoto}
        disabled={
          currentPhoto === albums[currentAlbum].length - 1 ? true : false
        }
        class="desktop-button"
      >
        &rarr;
      </button>
    </div>
  );
}

export default DesktopScreen;
