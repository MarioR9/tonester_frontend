// initial page load


if(!localStorage.getItem('user')){
document.addEventListener("DOMContentLoaded", function(){

  User.verify()

})

}else{
document.addEventListener("DOMContentLoaded", function(){
      User.keepUserLogin(JSON.parse(localStorage.user).username)
  })
  
  
}


