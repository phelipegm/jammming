import React from "react"
import './Track.css';

function Track(props) {
    return (
        <div>
            <p className="song-title">{props.song.songName}</p>
            <p className='song-artist-album'>{props.song.artistName} | {props.song.albumName}</p>    
            <hr></hr>
        </div>
    );
}

export default Track;