import React, { useState } from 'react';
import './Playlist.css';
import Track from '../Track/Track';

function Playlist(props) {

    return (
        <div>
            <h1 className='main-title'>Playlist</h1>
            <input className='playlist-name' type='text' placeholder='Name' value={props.playlistName} onChange={props.onChangePlaylistName} />
            <hr></hr>
            <div className='playlist-container'>
                <ul className='playlist-content'>
                    {props.playlistSongs.map((song, index) =>
                        <li key={index}>
                            <Track song={song} />
                            <input className="remove-button" type="button" value="-" onClick={() => props.onClickRemoveSongToPlaylist(song)} />
                        </li>
                    )}
                </ul>
            </div>
            <div className='button-container'>
                <input className='save-button' type='button' value='SAVE TO SPOTIFY' onClick={() => props.onClickSavePlaylist(props.playlistName)} />
            </div>
        </div>
    );
}

export default Playlist;