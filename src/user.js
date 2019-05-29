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
    User.renderProfile(data)})
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
    // let counter = 3
    if (data.id) {
      let page = document.getElementById("login-existing")
      page.innerText = ""
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
          let playlistDiv = document.createElement("div")
          playlistDiv.classList.add("playlist")
          playlistDiv.innerText = playlist.title
          playlistWindowDiv.appendChild(playlistDiv)

          let songs = playlist.songs
          songs.forEach( song => {
            let sectionDiv = document.createElement("div")
            sectionDiv.classList.add("song")
            let songData = document.createElement("ul")
            let titleLi = document.createElement("li")
            titleLi.innerText = `Title: ${song.title}`
            let albumLi = document.createElement("li")
            albumLi.innerText = `Album: ${song.album}`

            let artistLi = document.createElement("li")
            artistLi.innerText = `Artist: ${song.artist}`

            let genreLi = document.createElement("li")
            genreLi.innerText = `Genre: ${song.genre}`

            songData.append(artistLi, titleLi, albumLi, genreLi)
            sectionDiv.appendChild(songData)
            playlistDiv.appendChild(sectionDiv)
          })

        }
      )

      profileDiv.append(image, username, bio)
      page.append(profileDiv, searchDiv, playlistWindowDiv)

    } else {
      alert(data.message)
    }
  }



}
