import React from "react";
import Track from "../Track/Track";
import './SearchResults.css';

function SearchResults(props) {
    return (
        <div>
            <h1 className="main-title">Results</h1>
            {props.songs.map((song, index) =>
                <>
                    <ul className="search-content" key={index}>
                        <Track song={song} />
                        <input className="add-button" type="button" value="+" onClick={() => props.onClickAddSongToPlaylist(song)} />
                    </ul>
                    <hr></hr>
                </>
            )}
        </div>
    );
}

export default SearchResults