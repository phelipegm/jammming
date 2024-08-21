import React from 'react';
import './Playlist.css';
import Track from '../Track/Track';

function Playlist(props) {
    console.log(props.playlistSongs);
    return (
        <div>
            {props.playlistSongs.map((song,index) =>
                <ul key={index}><Track song={song}/></ul>
            )}
        </div>
    );
}

export default Playlist;