import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const [songDetail, setSongDetail] = useState('');

    const handleSearchChange = event => {
        setSongDetail(event.target.value);
    };

    return (
        <div className='main-container'>
            <div>
                <input className='search-input' type='text' placeholder='Search' value={songDetail} onChange={handleSearchChange} />
            </div>
            <div>
                <input className='search-button' type='button' value='Search' onClick={() => props.onClickSearch(songDetail.toLowerCase())} />
            </div>
        </div>
    );
}

export default SearchBar;