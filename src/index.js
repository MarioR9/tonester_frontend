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

}



function verify() {
  let form = document.getElementById("login").addEventListener("submit", function() {grabUser()} )
}

function grabUser(e) {
  e.preventDefault()
  console.log("brrraaap")
  // let name = document.getElementById("username_field").innerText
  // console.log(name)
}
