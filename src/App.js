import { h, Component } from "preact";
/** @jsx h */

import axios from "axios";
import NavAlbum from "./containers/NavAlbum";
import "./App.css";

class App extends Component {
  state = {
    albums: [],
    currentAlbum: 0,
    currentPhoto: 0,
    currentPage: 1
  };

  handleChangePage = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  };

  render(props, { albums, currentAlbum, currentPhoto, currentPage }) {
    if (albums.length === 0) return <div>Fetching datas...</div>;

    const photosPerPage = 5;

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const photos = albums[currentAlbum].slice(
      indexOfFirstPhoto,
      indexOfLastPhoto
    );

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
          onClick={this.handleChangePage}
          class={
            "page-number " +
            (this.state.currentPage === number ? "current-page" : "")
          }
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        {/* album - nav */}
        <NavAlbum
          previousDisabled={currentAlbum === 0 ? true : false}
          nextDisabled={currentAlbum === albums.length - 1 ? true : false}
          previousAlbum={this.previousAlbum}
          nextAlbum={this.nextAlbum}
          albumName={albums[currentAlbum][0].albumId}
        />
        {/* mobile - only */}
        <div class="mobile-only">
          <ul class="pagination">{renderPageNumbers}</ul>
          {photos.map(photo => (
            <img src={photo.thumbnailUrl} alt={photo.title} />
          ))}
          <ul class="pagination">{renderPageNumbers}</ul>
        </div>
        {/* desktop - only */}
        <div class="desktop-only">
          <button
            onClick={this.previousPhoto}
            disabled={currentPhoto === 0 ? true : false}
          >
            -
          </button>
          <img
            src={albums[currentAlbum][currentPhoto].url}
            alt={albums[currentAlbum][currentPhoto].title}
          />
          <button
            onClick={this.nextPhoto}
            disabled={
              currentPhoto === albums[currentAlbum].length - 1 ? true : false
            }
          >
            +
          </button>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const albums = [];
      let curAlbumId = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].albumId !== curAlbumId) {
          curAlbumId = res.data[i].albumId;
          albums[curAlbumId - 1] = [];
        }
        albums[curAlbumId - 1].push(res.data[i]);
      }
      this.setState({ albums: albums });
    } catch (e) {
      console.log(e);
    }
  }

  previousPhoto = () => {
    //
    // !!!!! En Preact, on peut récupérer le state autrement ici ?
    //
    if (this.state.currentPhoto > 0)
      this.setState(prevState => ({
        currentPhoto: prevState.currentPhoto - 1
      }));
  };

  nextPhoto = () => {
    //
    // !!!!! En Preact, on peut récupérer le state autrement ici ?
    //
    if (
      this.state.currentPhoto <
      this.state.albums[this.state.currentAlbum].length - 1
    )
      this.setState(prevState => ({
        currentPhoto: prevState.currentPhoto + 1
      }));
  };

  previousAlbum = () => {
    //
    // !!!!! En Preact, on peut récupérer le state autrement ici ?
    //
    if (this.state.currentAlbum > 0)
      this.setState(prevState => ({
        currentAlbum: prevState.currentAlbum - 1,
        currentPage: 1,
        currentPhoto: 0
      }));
  };

  nextAlbum = () => {
    //
    // !!!!! En Preact, on peut récupérer le state autrement ici ?
    //
    if (this.state.currentAlbum < this.state.albums.length - 1)
      this.setState(prevState => ({
        currentAlbum: prevState.currentAlbum + 1,
        currentPage: 1,
        currentPhoto: 0
      }));
  };
}

export default App;
