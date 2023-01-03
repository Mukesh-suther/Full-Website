let postvalue = document.getElementById("postdata");
let currentuser = "";
let fileurl = "";
let fileType = "";

firebase.auth().onAuthStateChanged((user) => {
  currentuser = user;
});
function uploadimg(e) {
  fileType = e.target.files[0].type;
  var uploadfile = firebase.storage().ref()
    .child(`postFiles/${e.target.files[0].name}`)
    .put(e.target.files[0]);
  uploadfile.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error)
    },
    () => {
      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        fileurl = downloadURL;
      });
    }
  );}
function createpost() {
  if (postvalue.value !== "" || fileurl !== "") {
    firebase.firestore().collection("posts").add({
      Post: postvalue.value,
      uid: currentuser.uid,
      FileSrc: fileurl,
      FileType : fileType,
      Likes : [],
      Dislikes : [],
      Comments : []
    }).then(()=>{
      document.getElementById("message").style.display = "block"
      setTimeout(() => {
        document.getElementById("message").style.display = "none"
      }, 2000);
    })
  }
}
