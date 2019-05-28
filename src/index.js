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
}
