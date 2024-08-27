import { useState, useEffect } from 'react';
import './App.css';
import Banner from './Components/Banner/Banner';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import { getUserAuthorization, getToken, refreshAccessToken, searchMusic } from './utils/spotify-api';
import Playlist from './Components/Playlist/Playlist';

function App() {
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [musicUri, setMusicUri] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [tokenExpiry, setTokenExpiry] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      getToken(code).then(token => {
        setAccessToken(token.access_token);
        setRefreshToken(token.refresh_token);
        setTokenExpiry(Date.now() + token.expires_in * 1000);
        urlParams.delete('code');
        window.history.replaceState({}, '', `${window.location.pathname}`);
      });

    } else {
      getUserAuthorization();
    }
  }, []);

  useEffect(() => {
    const refreshTokenIfNeeded = () => {
      if (tokenExpiry && Date.now() >= tokenExpiry - 5 * 60 * 1000) {
        const newToken = refreshAccessToken(refreshToken).then(result => {
          setAccessToken(newToken.access_token);
          setRefreshToken(newToken.refresh_token);
          setTokenExpiry(Date.now() + newToken.expires_in * 1000);
        });
      }
    };

    const intervalId = setInterval(refreshTokenIfNeeded, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [accessToken]);

  const onClickSearch = songDetail => {
    searchMusic(songDetail, accessToken).then(result => {
      setSongs(result);
    });
  };

  const onClickAddSongToPlaylist = song => {
    if (!playlistSongs.includes(song)) {
      setPlaylistSongs((prev) => {
        return [song, ...prev]
      });

      setMusicUri((prev) => {
        return [song.uri, ...prev]
      });
    }
  };

  const onClickRemoveSongToPlaylist = song => {
    setPlaylistSongs((prev) => {
      return prev.filter(item => item !== song);
    });
  };

  const onClickSavePlaylist = playlistName => {
    if (playlistName !== "" && playlistSongs.length > 0) {
      setPlaylistSongs([]);
      setPlaylistName("");
    }
  };

  const onChangePlaylistName = event => {
    setPlaylistName(event.target.value);
  };


  return (
    <div className="App">
      <Banner />
      <SearchBar onClickSearch={onClickSearch} />
      <div className='results-container'>
        <div className='opaque-container'>
          <SearchResults songs={songs} onClickAddSongToPlaylist={onClickAddSongToPlaylist} />
        </div>
        <div className='opaque-container'>
          <Playlist playlistSongs={playlistSongs}
            playlistName={playlistName}
            onChangePlaylistName={onChangePlaylistName}
            onClickRemoveSongToPlaylist={onClickRemoveSongToPlaylist}
            onClickSavePlaylist={onClickSavePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
