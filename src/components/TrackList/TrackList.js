import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {
    return (
        <div className="TrackList">
            {props.tracks.map((track) => (
                <Track track={track} key={track.id} id={track.id} name={track.name} artist={track.artist} album={track.album} image={track.image} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval}/>
            ))}
        </div>
    )
}

export default TrackList;