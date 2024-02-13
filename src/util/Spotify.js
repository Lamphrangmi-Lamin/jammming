const clientId = "7eb259bae7d4451bbe0ed92d43655994";
const redirectUri = "http://localhost:3000/";

let accessToken;

const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    // Implement Spotify Search Request
    search: async (term) => {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    },

    // savePlaylist: (playlistName, trackURIs) => {
    //     if (!(playlistName && trackURIs)) {
    //         return;
    //     }
    //     const accessToken = Spotify.getAccessToken();
    //     const headers = {
    //         Authorization: `Bearer ${accessToken}`,
    //     };
    //     let userId;
    //     let playlistID;

    //     fetch("https://api.spotify.com/v1/me", {
    //         headers: headers
    //     })
    //     .then(response => response.json())
    //     .then(jsonResponse => {
    //         userId = jsonResponse.id;
    //         return userId;
    //     })

    //     fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    //         method: "POST",
    //         headers: headers,
    //         body: JSON.stringify({
    //             name: playlistName,
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(jsonResponse => {
    //         playlistID = jsonResponse.id;
    //         return playlistID;
    //     })

    //     fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify({
    //             'uris': trackURIs
    //         })
    //     })
    //     .then(response => response.json())
    //     .then(jsonResponse => {
    //         playlistID = jsonResponse.id;
    //         return playlistID;
    //     })
    // }

    savePlaylist: async (name, uris) => {
        if (!(name && uris)) {
            return;
        }

        try {
            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };

            // GET userID from the server
            const userResponse = await fetch(`https://api.spotify.com/v1/me`, {
                headers: headers
            });
            const userData = await userResponse.json();
            const userID = userData.id;

            //create playlist and receive a playlistID from the server
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    name: name
                })
            });
            const playlistData = await playlistResponse.json();
            const playlistID = playlistData.id;

            //Add tracks to the playlist to the playlistID
            await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    uris: uris
                })
            })
            
        } catch (error) {
            alert("ERROR in saving playlist", error);
        }
    }

};

export default Spotify;