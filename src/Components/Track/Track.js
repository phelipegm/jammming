import React from "react"
import './Track.css';

function Track(props) {
    return (
        <div>
            <div className="song-item">
                <div className="song-image-container">
                    <img className="song-image" src={props.song.imageUrl} />
                </div>
                <div className="song-details">
                    <p className="song-title">{props.song.songName}</p>
                    <p className='song-artist-album'>{props.song.artistName} | {props.song.albumName}</p>
                </div>
            </div>
            <hr className="line"></hr>
        </div>

    );
}

export default Track;