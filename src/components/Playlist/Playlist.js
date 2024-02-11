import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
    const handleNameChange = (e) => {
        props.onNameChange(e.target.value);
    };

    return (
        <div className="Playlist">
            <input defaultValue={props.playlistName} onChange={handleNameChange} />
            {console.log(props.playlistTracks)}
            <TrackList onRemove={props.onRemove} isRemoval={true} tracks={props.playlistTracks} />
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;