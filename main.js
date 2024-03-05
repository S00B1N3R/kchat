function logIn(){
name=document.getElementById("username").value
localStorage.setItem("username",name)
window.location="chatpage.html"
}