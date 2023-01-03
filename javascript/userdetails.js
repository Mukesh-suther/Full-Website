var postsshowbutton = document.getElementById("postsbutton");
var updatedatabutton = document.getElementById("updatedatabutton")
var showuserprofilebutton = document.getElementById("userprofilebutton");
var userdata = document.getElementById("editabledatadiv");
var currentuserpost = document.getElementById("currentuserpostsdiv");
var userprofileimg = document.getElementById("userprofileimg");
var usercoverimg = document.getElementById("usercoverimg");
let userprofilesrc = "";
let usercoversrc = ""
var message = document.getElementById("message")
let useruid = "";

//change cover picture function
function changecoverpicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${useruid}/coverpicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((coverpicture) => {
        firebase
          .firestore()
          .collection("users/")
          .doc(useruid)
          .update({ CoverPicture: coverpicture });
      });
    }
  );
}

//change profile picture function
function changeprofilepicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${useruid}/profilepicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((profilepicture) => {
        firebase
          .firestore()
          .collection("users/")
          .doc(useruid)
          .update({ ProfilePicture: profilepicture });
      });
    }
  );
}
postsshowbutton.addEventListener("click", () => {
  userdata.style.display = "none";
  currentuserpost.style.display = "block";
  postsshowbutton.style.backgroundColor = "#0000ff";
  postsshowbutton.style.color = "white";
  showuserprofilebutton.style.backgroundColor = "white";
  showuserprofilebutton.style.color = "#0000ff";
});
showuserprofilebutton.addEventListener("click", () => {
  userdata.style.display = "block";
  currentuserpost.style.display = "none";
  showuserprofilebutton.style.backgroundColor = "#0000ff";
  showuserprofilebutton.style.color = "white";
  postsshowbutton.style.backgroundColor = "white";
  postsshowbutton.style.color = "#0000ff";
});
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    useruid = user.uid;
    if (user.emailVerified) {
      let Name = "";
      //userdetails
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .onSnapshot((userdetails) => {
          userprofilesrc = userdetails.data().ProfilePicture
          usercoversrc = userdetails.data().CoverPicture
              //currentusercommentprofile
              if(userprofilesrc !== ""){
              document.getElementById("currentusercommentprofile").setAttribute("src" , userprofilesrc)}
              //user profile Picture
              if(userprofilesrc !== ""){
              userprofileimg.setAttribute("src", userprofilesrc); }
              //user cover Picture
              if(usercoversrc !== ""){
              usercoverimg.setAttribute("src", usercoversrc);}

              Name = userdetails.data().Firstname + " " + userdetails.data().Lastname;
              document.getElementById("firstname").value =
                userdetails.data().Firstname;
              document.getElementById("lastname").value =
                userdetails.data().Lastname;
              document.getElementById("mobileno").value =
                userdetails.data().MobileNo;
              document.getElementById("emailaddress").value =
                userdetails.data().Email;
              document.getElementById("userdescription").value = userdetails.data().Description
        });
        //update data
        updatedatabutton.addEventListener("click" , ()=>{
          firebase.firestore().collection("users/").doc(user.uid).update({
            Firstname : document.getElementById("firstname").value,
            Lastname : document.getElementById("lastname").value,
            MobileNo : document.getElementById("mobileno").value,
            Description : document.getElementById("userdescription").value 
        }).then(()=>{
            message.innerHTML = "Successfully Updated";
            message.style.color = "green"
            setInterval(() => {
              message.innerHTML = ""
            }, 2000);          
        })
        })
        //Posts
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((usersposts) => {
          if(usersposts.size === 0){
            document.getElementById("loaderdiv").style.display = "none"
            document.getElementById("messagediv").style.display = "block"
          }else{
          usersposts.forEach((posts) => {
            document.getElementById("loaderdiv").style.display = "none"
            if (posts.data().uid === user.uid) {
              var filetype = posts.data().FileType;
              var filesrc = posts.data().FileSrc;
              // user posts
              console.log(posts.data());
              var post = document.createElement("div");
              currentuserpost.appendChild(post);
              post.setAttribute("class", "post col-12");

              var userdetails = document.createElement("div");
              post.appendChild(userdetails);
              userdetails.setAttribute("class", "userdetailsdiv col-12");

              var userprofilediv = document.createElement("div");
              userdetails.appendChild(userprofilediv);
              userprofilediv.setAttribute("class", "userprofilediv col-2");

              var userprofile = document.createElement("img");
              userprofilediv.appendChild(userprofile);
              userprofile.setAttribute("class", "postuserprofile");
              console.log(userprofilesrc)
              if(userprofilesrc === ""){
                userprofile.setAttribute("src" , "./../assessts/icons/user.png")
              }else{
                userprofile.setAttribute("src" , userprofilesrc)
              }

              var usernameanddetailsdiv = document.createElement("div");
              userdetails.appendChild(usernameanddetailsdiv);
              usernameanddetailsdiv.setAttribute(
                "class",
                "usernameanddetailsdiv"
              );

              var username = document.createElement("p");
              usernameanddetailsdiv.appendChild(username);
              username.setAttribute("class", "username");
              username.innerHTML = Name;

              var postdate = document.createElement("p");
              usernameanddetailsdiv.appendChild(postdate);
              postdate.setAttribute("class", "postdate");
              postdate.innerHTML = "10-12-2022";

              var editanddeltebtndiv = document.createElement("div");
              userdetails.appendChild(editanddeltebtndiv);
              editanddeltebtndiv.setAttribute("class", "editanddeletbtn");

              var editbtn = document.createElement("i");
              editanddeltebtndiv.appendChild(editbtn);
              editbtn.setAttribute("class", "fa-solid fa-pencil postsbtn");
              editbtn.setAttribute("id", "editbtn");

              var deletbtn = document.createElement("i");
              editanddeltebtndiv.appendChild(deletbtn);
              deletbtn.setAttribute("class", "fa-solid fa-trash postsbtn");
              deletbtn.setAttribute("id", "deletebtn");
              deletbtn.style.marginLeft = "8px";

              if (posts.data().Post !== "") {
                var posttext = document.createElement("p");
                post.appendChild(posttext);
                posttext.setAttribute("class", "posttext col-12");
                posttext.innerHTML = posts.data().Post;
              } else if (posts.data().filesrc !== "") {
                if (
                  filetype === "image/png" ||
                  filetype === "image/jpeg" ||
                  filetype === "image/jpg" ||
                  filetype === "image/webp"
                ) {
                  var postimage = document.createElement("img");
                  post.appendChild(postimage);
                  postimage.setAttribute("class", "posttext col-12");
                  postimage.setAttribute("src", filesrc);
                } else {
                  let postvideo = document.createElement("video");
                  post.appendChild(postvideo);
                  postvideo.setAttribute("controls", "true");
                  postvideo.setAttribute("class", "postVideo");
                  let source = document.createElement("source");
                  postvideo.appendChild(source);
                  source.setAttribute("src", posts.data().FileSrc);
                  source.setAttribute("type", "video");
                  source.style.width = "100%";

                }
              }

              var impressionsdiv = document.createElement("div");
              post.appendChild(impressionsdiv);
              impressionsdiv.setAttribute("class", "col-12 impressionsdiv");

              //like
              var likediv = document.createElement("div");
              impressionsdiv.appendChild(likediv);
              likediv.setAttribute("class", "likediv");

              var likeicons = document.createElement("i");
              likediv.appendChild(likeicons);
              likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

              var liketitle = document.createElement("p");
              likediv.appendChild(liketitle);
              liketitle.setAttribute("class", "impressionstitle");
              liketitle.innerHTML = "Like (0)";

              //disklike
              var disklikediv = document.createElement("div");
              impressionsdiv.appendChild(disklikediv);
              disklikediv.setAttribute("class", "disklikediv");

              var dislikelikeicon = document.createElement("i");
              disklikediv.appendChild(dislikelikeicon);
              dislikelikeicon.setAttribute(
                "class",
                "fa-regular fa-thumbs-down"
              );

              var diskliketitle = document.createElement("p");
              disklikediv.appendChild(diskliketitle);
              diskliketitle.setAttribute("class", "impressionstitle");
              diskliketitle.innerHTML = "Dislike (0)";

              //comment
              var commentdiv = document.createElement("div");
              impressionsdiv.appendChild(commentdiv);
              commentdiv.setAttribute("class", "commentdiv");

              var commenticon = document.createElement("i");
              commentdiv.appendChild(commenticon);
              commenticon.setAttribute("class", "fa-regular fa-message");

              var commenttitle = document.createElement("p");
              commentdiv.appendChild(commenttitle);
              commenttitle.setAttribute("class", "impressionstitle");
              commenttitle.innerHTML = "Comment (0)";

              //currentusercomment
              var currentusercommentdiv = document.createElement("div");
              post.appendChild(currentusercommentdiv);
              currentusercommentdiv.setAttribute(
                "class",
                "currentusercommentdiv col-12"
              );

              var currentusercommentinput = document.createElement("input");
              currentusercommentdiv.appendChild(currentusercommentinput);
              currentusercommentinput.setAttribute(
                "placeholder",
                "Write Comment....."
              );
              currentusercommentinput.setAttribute(
                "class",
                "currentusercommentinput"
              );

              var currentusercommentsendbutton =
                document.createElement("button");
              currentusercommentdiv.appendChild(currentusercommentsendbutton);
              currentusercommentsendbutton.setAttribute(
                "class",
                "currentusercommentsendbutton"
              );

              var currentusercommentsendbuttonimg = document.createElement("i");
              currentusercommentsendbutton.appendChild(
                currentusercommentsendbuttonimg
              );
              currentusercommentsendbuttonimg.setAttribute(
                "class",
                "fa-solid fa-paper-plane sendemailbutton"
              );
            }else{
                document.getElementById("loaderdiv").style.display = "none"
                document.getElementById("messagediv").style.display = "block"
            }
          });}
        });
    } else {
      window.location.assign("./../pages/emailverified.html");
    }
  } else {
    window.location.assign("./../pages/Login.html");
  }
});
