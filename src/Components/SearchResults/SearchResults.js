import React from "react";
import Track from "../Track/Track";
import './SearchResults.css';

function SearchResults(props) {
    return (
        <div>
            <h1 className="main-title">Results</h1>
            <div className='result-container'>
                <ul className="search-content">
                    {props.songs.map((song, index) =>
                        <li key={index}>
                            <Track song={song} />
                            <input className="add-button" type="button" value="+" onClick={() => props.onClickAddSongToPlaylist(song)} />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SearchResults