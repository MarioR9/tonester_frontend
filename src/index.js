// initial page load


document.addEventListener("DOMContentLoaded", init)

function init() {

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
  fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      username: name
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
    // find user, if exists, pass UserID into URL

// run name against things already in DB
// if match, go to page
// if no match, send alert
// decrement from total of 3, after all attempts exhausted, send to creation page


}
