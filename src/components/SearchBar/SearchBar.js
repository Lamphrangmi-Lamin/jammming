import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
    const [searchTerm,  setSearchTerm] = useState('');

    const passTerm = () => props.onSearch(searchTerm);

    const handleTermChange = (e) => setSearchTerm(e.target.value);

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
            <button className="SearchButton" onClick={passTerm}>SEARCH</button>
        </div>
    )
}