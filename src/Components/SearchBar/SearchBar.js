import React, {useState} from 'react';

function SearchBar(props) {
    const [songDetail, setSongDetail] = useState('');

    const handleSearchChange = event => {
        setSongDetail(event.target.value);
    };

    return (
        <div>
            <div>
                <input type='text' placeholder='Search' value={songDetail} onChange={handleSearchChange} />
            </div>
            <div>
                <input type='button' value='Search' onClick={() => props.onClickSearch(songDetail.toLowerCase())} />
            </div>
        </div>
    );
}

export default SearchBar;