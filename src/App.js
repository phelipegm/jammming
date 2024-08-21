import {useState} from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import searchMusic from './utils/spotify-api';
import Playlist from './Components/Playlist/Playlist';

function App() {
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const onClickSearch = songDetail => {
    let result = searchMusic(songDetail);
    setSongs(result);
  }

  const onClickAddSongToPlaylist = song => {
    setPlaylistSongs((prev) => { 
      return [song, ...prev]
    });
  }

  return (
    <div className="App">
        <Banner />
        <SearchBar onClickSearch={onClickSearch} />
        <div className='results-container'>
          <SearchResults songs={songs} onClickAddSongToPlaylist={onClickAddSongToPlaylist}/>
          <Playlist playlistSongs={playlistSongs} />
        </div>
    </div>
  );
}

export default App;
