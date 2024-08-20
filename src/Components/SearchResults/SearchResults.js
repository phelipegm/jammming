import React from "react";
import Track from "../Track/Track";

function SearchResults(props) {
    return (
        <div>
            <h1>Results</h1>
            { props.songs.map((song, index) => 
                <ul key={index}><Track song={song} /></ul>
            )}
        </div>
    );
}

export default SearchResults