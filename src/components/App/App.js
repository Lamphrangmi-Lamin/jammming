import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { useState } from 'react';
import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      uri: 1,
      id: 1,
      name: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      image: "src"
    },
    {
      uri: 2,
      id: 2,
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      image: "src"
    },
    {
      uri: 3,
      id: 3,
      name: "Rolling in the Deep",
      artist: "Adele",
      album: "21",
      image: "src"
    }
  ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const addTrack = (track) => {
    const found = playlistTracks.find(savedTrack => (savedTrack.id === track.id));
    if (!found) {
      setPlaylistTracks(playlistTracks => playlistTracks.concat(track));
      setSearchResults(searchResults.filter(obj => obj.id !== track.id));
    }
  };

  const removeTrack = (track) => {
    const filteredTrackList = playlistTracks.filter(t => t.id !== track.id);
    setPlaylistTracks(filteredTrackList);
    setSearchResults(searchResults.concat(track));
  };

  const updatePlaylistName = (name) => setPlaylistName(name);

  const savePlaylist = () => {
    if (!playlistTracks.length) {
      return alert("PLEASE ADD SOME TRACKS \u{1F60A}");
    };
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs);
    alert("PLAYLIST SUCCESSFULLY CREATED!!")
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  const search = (term) => {
    Spotify.search(term).then(data => {
      setSearchResults(data);
    });
  };

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist searchResults={searchResults} playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />
        </div>
      </div>
    </div>
  )
}

export default App;