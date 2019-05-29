// create playlists

// add playlists

// copy playlists

// add songs

// remove songs

// search for songs

class Playlist{

    static fetchSongs(title, playlist_id){
        let playlistDiv = document.getElementById(`${playlist_id}`)
        fetch("http://localhost:3000/songs",{
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
            title: title,
            playlist_id: playlist_id
        })
      })
        .then(response => response.json())
        .then(data => User.renderSongSec(data.newSong, playlistDiv))
        }

    static deleteBtn() {
      fetch(`http://localhost:3000/playlistsongs/${playlistsongs_id}`, {
        
      })

    }
}
