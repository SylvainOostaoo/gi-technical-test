import { h, Component } from "preact";
/** @jsx h */

import axios from "axios";
import NavAlbum from "./containers/NavAlbum";
import MobileScreen from "./containers/MobileScreen";
import DesktopScreen from "./containers/DesktopScreen";
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

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* album - nav */}
        <NavAlbum
          albums={albums}
          currentAlbum={currentAlbum}
          previousAlbum={this.previousAlbum}
          nextAlbum={this.nextAlbum}
          albumName={albums[currentAlbum][0].albumId}
        />
        {/* mobile - only */}
        <div class="mobile-only">
          <MobileScreen
            albums={albums}
            currentAlbum={currentAlbum}
            currentPage={currentPage}
            handleChangePage={this.handleChangePage}
          />
        </div>
        {/* desktop - only */}
        <div class="desktop-only">
          <DesktopScreen
            albums={albums}
            currentAlbum={currentAlbum}
            currentPhoto={currentPhoto}
            previousPhoto={this.previousPhoto}
            nextPhoto={this.nextPhoto}
          />
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
    if (this.state.currentPhoto > 0)
      this.setState(prevState => ({
        currentPhoto: prevState.currentPhoto - 1
      }));
  };

  nextPhoto = () => {
    if (
      this.state.currentPhoto <
      this.state.albums[this.state.currentAlbum].length - 1
    )
      this.setState(prevState => ({
        currentPhoto: prevState.currentPhoto + 1
      }));
  };

  previousAlbum = () => {
    if (this.state.currentAlbum > 0)
      this.setState(prevState => ({
        currentAlbum: prevState.currentAlbum - 1,
        currentPage: 1,
        currentPhoto: 0
      }));
  };

  nextAlbum = () => {
    if (this.state.currentAlbum < this.state.albums.length - 1)
      this.setState(prevState => ({
        currentAlbum: prevState.currentAlbum + 1,
        currentPage: 1,
        currentPhoto: 0
      }));
  };
}

export default App;
