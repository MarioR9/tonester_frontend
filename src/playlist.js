
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

    // static deleteBtn() {
    //   fetch(`http://localhost:3000/playlistsongs/${playlistsongs_id}`, {
        
    //   })

    // }
    static createPlaylistForm(){
      
      let manDiv = document.querySelector('#login-existing')
      let newPlayListDiv = document.createElement('div')
      newPlayListDiv.innerText = "Create A New Playlist"
      let playlistForm = document.createElement('form')
      let playlistInput = document.createElement('input')
      playlistInput.placeholder = "Title"
      let createBtn = document.createElement('button')
      createBtn.innerText = "Create"
      playlistForm.addEventListener('submit', (e)=>{
        e.preventDefault() 
      
        let input = e.target[0].value 
        let user_id = e.target.parentElement.parentElement.dataset.uId
        Playlist.createPlaylistOnDataBase(input,user_id)      
        })
      
      manDiv.appendChild(newPlayListDiv)
      newPlayListDiv.appendChild(playlistForm)
      playlistForm.append(playlistInput,createBtn)
    }

    static createPlaylistOnDataBase(input,user_id){
      
      fetch("http://localhost:3000/playlists",{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
        title: input,
        user_id: user_id
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }



  }
