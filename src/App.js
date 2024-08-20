import {useState} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import searchMusic from './utils/spotify-api';

function App() {
  const [songs, setSongs] = useState([]);

  const onClickSearch = songDetail => {
    let result = searchMusic(songDetail);
    setSongs(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar onClickSearch={onClickSearch} />
        <SearchResults songs={songs} />
      </header>
    </div>
  );
}

export default App;
