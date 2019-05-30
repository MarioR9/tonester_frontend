// create users
// edit information

class User {
  constructor(bio, photo, username) {
    this.bio = bio
    this.photo = photo
    this.username = username
  }

  static verify() {
    let form = document.getElementById("login")
    form.addEventListener("submit", this.grabUser)
    
    let button = document.getElementById("create-account")
    button.addEventListener("click", User.createAccount)
  }

  static grabUser(e) {
    e.preventDefault()
    let name = e.currentTarget.firstElementChild.value
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        username: name
    })
  })
  .then(res => res.json())
  .then(data => {
    User.renderProfile(data)
    if(data.id){
    Playlist.createPlaylistForm()
  }
  })
  // find user, if exists, pass UserID into URL

// run name against things already in DB
// if match, go to page
// if no match, send alert
// decrement from total of 3, after all attempts exhausted, send to creation page
}

 static createAccount() {

    let oldForm = document.getElementById("login-existing")
    oldForm.innerText = ""
    oldForm.innerHTML = `
    <form class="create" action="index.html" method="post">
     <input type="text" id="create-username" placeholder="New Username">
     <input type="text" placeholder="New Bio">
     <input type="text" placeholder="New Photo">
     <button id="submit-btn" type="submit" name="button">Create New User!</button>
    </form>`

    let btn = document.querySelector(".create")
      btn.addEventListener('submit', (e)=>{
        e.preventDefault()
        console.log("clicked")

        let username = event.target.children[0].value
        let bio = event.target.children[1].value
        let photo = event.target.children[2].value
        fetch('http://localhost:3000/users', {
         method: "POST",
          headers: {"Content-type": "application/json"},
           body: JSON.stringify({
            bio: bio,
            photo: photo,
            username: username
          })
        })
      })
    }

  static renderProfile(data) {
    
    if (data.id) {
      
      let page = document.getElementById("login-existing")
      page.innerText = ""
      page.dataset.uId = data.id
      let profileDiv = document.createElement("div")
      profileDiv.classList.add("profile")
      let image = document.createElement("img")
      image.classList.add("avatar")
      image.src = data.photo

      let bio = document.createElement("p")
      bio.classList.add("description")
      bio.innerText = data.bio

      let username = document.createElement("h2")
      username.classList.add("title")
      username.innerText = data.username

      let searchDiv = document.createElement("div")
      searchDiv.classList.add("search")

      let playlistWindowDiv = document.createElement("div")
      playlistWindowDiv.classList.add("playlist")


      let list = data.playlists
      list.forEach( playlist => {
          User.renderPlaylist(playlist,playlistWindowDiv)
      })
      profileDiv.append(image, username, bio)
      page.append(profileDiv, searchDiv, playlistWindowDiv)
     

    } else {
      alert(data.message)
    }
  }
  static renderPlaylist(playlist,playlistWindowDiv){
    let playlistDiv = document.createElement("div")
          playlistDiv.classList.add("playlistSong")
          playlistDiv.innerText = playlist.title
          playlistDiv.id = playlist.id
          let editButton = document.createElement('button')
          let editTitle = document.createElement("input")
          User.deletePlaylist(playlistDiv)
          editButton.innerText = "Edit"
          editTitle.setAttribute('type','hidden')
          //Edit button to text on click
          playlistDiv.append(editTitle,editButton)
          editButton.addEventListener('click',(e)=>{
              e.preventDefault()
          editTitle.setAttribute('type','text')
          editButton.addEventListener('click',(e)=>{
              e.preventDefault() 
          
          let editedInput = e.target.parentElement.children[0].value 
          let playlistId  = playlistDiv.id
          playlistDiv.remove()
          Playlist.updateTitle(editedInput,playlistId,playlistWindowDiv)
            })
            
          })
          

          let newSongForm = document.createElement('form')
          let newSongInput = document.createElement('input')
          let newSong = document.createElement('button')
          newSong.id = "songBtn"
          newSong.innerText = "🎵"
          newSongInput.setAttribute("type","hidden")
          playlistDiv.appendChild(newSong)
          newSong.addEventListener('click', ()=>{ 
            newSong.style.display = "none"  
            
          newSongInput.setAttribute("type", "text")
          newSongInput.placeholder = "Song Tittle"  
          playlistDiv.append(newSongForm)
          newSongForm.appendChild(newSongInput)
          console.log("music!")
        
          newSongForm.addEventListener('submit',(e)=>{
              e.preventDefault()
              newSongInput.style.display = "none"
              let title = e.target[0].value
              let playlist_id = e.target.parentElement.id
              
              Playlist.fetchSongs(title, playlist_id)
            })
          })
          
         

          playlistWindowDiv.appendChild(playlistDiv)
          let songs = playlist.songs
          songs.forEach( song => {
          User.renderSongSec(song,playlistDiv)
        })
  }


  static renderSongSec(song,playlistDiv){
      let sectionDiv = document.createElement("div")
      sectionDiv.classList.add("song")
      sectionDiv.id = song.id
      let deleteBtn = document.createElement("button")
      deleteBtn.innerText = "X"
      sectionDiv.appendChild(deleteBtn)
      deleteBtn.addEventListener("click", (e) => {
          e.preventDefault()
      let findDiv = e.target.parentElement
      let songId = e.target.parentElement.id
      let playlistId = e.target.parentElement.parentElement.id
      Playlist.deleteBtn(playlistId,songId,findDiv)
        console.log("baleeted")})
      let songData = document.createElement("ul")
      let titleLi = document.createElement("li")
      titleLi.innerText = `Title: ${song.title}`
      let albumLi = document.createElement("li")
      albumLi.innerText = `Album: ${song.album}`

      let artistLi = document.createElement("li")
      artistLi.innerText = `Artist: ${song.artist}`

      let genreLi = document.createElement("li")
      genreLi.innerText = `Genre: ${song.genre}`
      let hiddenForm = document.createElement('form')
      let hiddenInput = document.createElement('input')
      hiddenInput.setAttribute("type", "hidden")
      songData.addEventListener('mouseenter',()=>{

      hiddenInput.setAttribute("type", "text")
      hiddenInput.classList.add("songInput")
      hiddenForm.append(hiddenInput)
      })

      hiddenForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        let title = event.target.children[0].value
        let playlist_id = event.target.parentElement.parentElement.parentElement.id

        Playlist.fetchSongs(title, playlist_id)
        hiddenInput.setAttribute("type","hidden")
        hiddenInput.value = ""
      })

      songData.append(artistLi, titleLi, albumLi, genreLi,hiddenForm)
      sectionDiv.appendChild(songData)
      playlistDiv.appendChild(sectionDiv)
    }

    
    static deletePlaylist(playlistDiv){
      let deleteBtn = document.createElement('button')
      deleteBtn.innerText = "Delete"
      playlistDiv.appendChild(deleteBtn)
      deleteBtn.addEventListener('click',(e)=>{
        e.preventDefault()
        // debugger
        let playlistId = e.target.parentElement.id 
        let playlistDiv = e.target.parentElement
        Playlist.removePlaylist(playlistId,playlistDiv)
      })
    }

}
