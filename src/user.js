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
  // debugger
}
  static grabUser = (e)=> {
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
  .then(data => {console.log(data)})
  // localStorage.setItem(data,data.user_id)
    // find user, if exists, pass UserID into URL

// run name against things already in DB
// if match, go to page
// if no match, send alert
// decrement from total of 3, after all attempts exhausted, send to creation page
}

 static createAccount() {
    let button = document.getElementById("create-account")
    button.addEventListener("click", () => {

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

    })



  }

}
