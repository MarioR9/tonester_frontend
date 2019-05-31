
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
        .then(data => Playlist.checkForSong(data,playlistDiv))
        }

        static checkForSong(data,playlistDiv){

            if(data.song.id){
              User.renderSongSec(data.song, playlistDiv)
            }else{
              alert(data.message)
            }
        }

    static deleteBtn(playlistId,songId,findDiv) {
      fetch(`http://localhost:3000/delete`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                playlist_id: playlistId,
                song_id: songId
            })
            })
        .then(response => response.json())
        .then(playlist => findDiv.remove())
    }
    static createPlaylistForm(){

      let mainDiv = document.querySelector('#login-existing')
      let newPlayListDiv = document.createElement('div')
      newPlayListDiv.classList.add("playlist-card")
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
        let playlistDiv = e.target.parentElement.parentElement.children[2]
        Playlist.createPlaylistOnDataBase(input,user_id,playlistDiv)
        })

      mainDiv.appendChild(newPlayListDiv)
      newPlayListDiv.appendChild(playlistForm)
      playlistForm.append(playlistInput,createBtn)
    }

    static createPlaylistOnDataBase(input,user_id,playlistDiv){

      fetch("http://localhost:3000/playlists",{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
        title: input,
        user_id: user_id
        })
      })
      .then(response => response.json())
      .then(playlist => User.renderPlaylist(playlist,playlistDiv) )
    }

    static updateTitle(editedInput,playlistId,playlistWindowDiv){

      fetch(`http://localhost:3000/playlists/${playlistId}`,{
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
        title: editedInput

        })
      })
      .then(response => response.json())
      .then(data =>
        User.renderPlaylist(data,playlistWindowDiv)

        )
    }


    static removePlaylist(playlistId,playlistDiv){
        fetch(`http://localhost:3000/playlistdelete/${playlistId}`,{
        method: "DELETE"
      })
      .then(playlistDiv.remove())
    }
  }
