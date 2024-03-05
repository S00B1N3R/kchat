//YOUR FIREBASE LINKS
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
                        nametag = "<h4>" + name + "</h4>"
                        messagetag = "<h4 class='message_h4'>" + message + "</h4>"
                        buttontag = "<button class='btn btn-warning btnlike' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'>"
                        spantag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span> </button> <hr>"
                        row = nametag + messagetag + buttontag + spantag
                        document.getElementById("output").innerHTML += row
                        //End code
                  }
            });
      });
}
getData();
function logout() {
      localStorage.removeItem("username")
      localStorage.removeItem("roomname")
      window.location = "index.html"
}
function send() {
      message = document.getElementById("message").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            like: 0
      })
      document.getElementById("message").value = ""
}
function updatelike(id) {

      like = document.getElementById(id).value
      updatedlikes = Number(like) + 1
      firebase.database().ref(room_name).child(id).update({
            like: updatedlikes
      })
}