import React from "react";
import Track from "../Track/Track";
import './SearchResults.css';

function SearchResults(props) {
    console.log(props.songs);
    return (
        <div>
            <h1 className="main-title">Results</h1>
            <div className='result-container'>
            {props.songs.map((song, index) =>
                <>
                    <ul className="search-content" key={index}>
                        <Track song={song} />
                        <input className="add-button" type="button" value="+" onClick={() => props.onClickAddSongToPlaylist(song)} />
                    </ul>
                </>
            )}
            </div>
        </div>
    );
}

export default SearchResults