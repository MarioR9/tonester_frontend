// create playlists

// add playlists

// copy playlists

// add songs

// remove songs

// search for songs

class Playlist{
    
    
    static fetchSongs(title){
        
        fetch("http://localhost:3000/search",{
            method: "post",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
            title: title
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        }

}


