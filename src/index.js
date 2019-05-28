// initial page load


document.addEventListener("DOMContentLoaded", init)

function init() {
  console.log("You made it, buddy!")
  fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      bio: "Happy person",
      photo: "n/a",
      username: "Mr. Giggles"
    })
  })

  verify()
  user5 = new User("A super chill lady", "n/a", "Chill Diane")
  user5.createAccount()
}


function verify() {
  let form = document.getElementById("login")
  form.addEventListener("submit", grabUser )
}

function grabUser(e) {
  e.preventDefault()
  let name = e.currentTarget.firstElementChild.value
  console.log(name)
  fetch('http://localhost:3000/users', {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      bio: "Random dude",
      photo: "n/a",
      username: `${name}`
    })
  })
  .then(res => res.json())
  .then(data => console.log(`Success! Here is the thing ${data}`))

  // let name = document.getElementById("username_field").innerText
  // console.log(name)
}
