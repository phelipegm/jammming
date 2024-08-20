import React from "react"

function Track(props) {
    return (
        <div>
            <div>
            {props.song.songName}
            </div>
            <div>
                {props.song.artist} | {props.song.album}    
            </div>
        </div>
    );
}

export default Track;