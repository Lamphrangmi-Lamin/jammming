import React from 'react';
import './Track.css';
function Track(props) {
  const passTrack = () => {
    props.onAdd(props.track);
  };

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  };

  return (
    <div className="Track" id={props.id} key={props.id}>
      <div className="Track-information">
        <h3>{props.name}</h3>
        <p>{props.artist} | {props.album}</p>
      </div>
      <button className="Track-action" onClick={props.isRemoval? passTrackToRemove : passTrack}>{props.isRemoval ? '-' : '+'}</button>
    </div>
  )
}

export default Track;