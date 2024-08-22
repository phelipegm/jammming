import React, {useState} from 'react';
import './Playlist.css';
import Track from '../Track/Track';

function Playlist(props) {
    const [playlistName, setPlaylistName] = useState();

    const handlePlaylistNameClick = event => {
        setPlaylistName(event.target.value);
    };

    return (
        <div>
            <h1 className='main-title'>Playlist</h1>
            <input className='playlist-name' type='text' placeholder='Name' value={playlistName} onClick={() => handlePlaylistNameClick} />
            <hr></hr>
            {props.playlistSongs.map((song, index) =>
                <>
                    <ul key={index}>
                        <Track song={song} />
                    </ul>
                </>
            )}
            <div className='button-container'>
                <input className='save-button' type='button' value='SAVE TO SPOTIFY' />
            </div>
        </div>
    );
}

export default Playlist;