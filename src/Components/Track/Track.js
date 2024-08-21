import React from "react"
import './Track.css';

function Track(props) {
    return (
        <div>
            <p className="song-title">{props.song.songName}</p>
            <p>{props.song.artist} | {props.song.album}</p>    
        </div>
    );
}

export default Track;