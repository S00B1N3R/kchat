const firebaseConfig = {
    apiKey: "AIzaSyA-NSVXcDGr1o-mgN7HX90DCi5lTEi_qP0",
    authDomain: "kwitter-ce294.firebaseapp.com",
    databaseURL: "https://kwitter-ce294-default-rtdb.firebaseio.com",
    projectId: "kwitter-ce294",
    storageBucket: "kwitter-ce294.appspot.com",
    messagingSenderId: "284579771756",
    appId: "1:284579771756:web:ffb537db7ddaa47b41ef49",
    measurementId: "G-X50V4L7286"
};
//ADD YOUR FIREBASE LINKS HERE
firebase.initializeApp(firebaseConfig)
room_name = localStorage.getItem("roomname")
user_name = localStorage.getItem("username")
console.log(room_name);
console.log(user_name);
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data["name"]
                        like = message_data["like"]
                        message = message_data["message"]
                        nametag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>"
                        messagetag = "<h4 class='message_h4'>" + message + "</h4>"
                        buttontag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>"
                        spantag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span> </button> <hr>"
                        row = nametag + messagetag + buttontag + spantag
                        document.getElementById("output").innerHTML += row
                        //End code
                  }
            });
      });
}


username = localStorage.getItem("username")
document.getElementById("username").innerHTML = username
function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                //Start code
                console.log(Room_names);
                row = "<div class= room_name onclick= redirect(this.id) id= '" + Room_names + "'>" + Room_names + "</div> <hr>"
                document.getElementById("output").innerHTML += row
                //End code
          });
    });
}
getData();
function send() {
      message = document.getElementById("message").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            like: 0
      })
      document.getElementById("message").value = ""
}
function logout() {
      localStorage.removeItem("username")
      localStorage.removeItem("roomname")
      window.location = "index.html"
}
function updatelike(id) {

      like = document.getElementById(id).value
      updatedlikes = Number(like) + 1
      firebase.database().ref(room_name).child(id).update({
            like: updatedlikes
      })
}
function logout() { }
function addroom() {
    roomname = document.getElementById("roomname").value
    firebase.database().ref("/").child(roomname).update({
          purpose: "New Room Added"
    })
    localStorage.setItem("roomname", roomname)
    window.location="kchatroom.html"
    

}
function redirect(id) {
    localStorage.setItem("roomname", id)
    window.location="kchatroom.html"
}
