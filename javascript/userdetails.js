var postsshowbutton = document.getElementById("postsbutton");
var updatedatabutton = document.getElementById("updatedatabutton")
var showuserprofilebutton = document.getElementById("userprofilebutton");
var userdata = document.getElementById("editabledatadiv");
var currentuserpost = document.getElementById("showposts");
var userprofileimg = document.getElementById("userprofileimg");
var usercoverimg = document.getElementById("usercoverimg");
var progressbardiv = document.getElementById("progressdiv")
var progressbar = document.getElementById("progressbar")
let userprofilesrc = "";
let usercoversrc = ""
var message = document.getElementById("message")
let useruid = "";
var createpostinput = document.getElementById("createpostinput")

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
      progressbardiv.style.visibility = "visible"
      var uploadpercentage = Math.round(progress)
      progressbar.style.width = `${uploadpercentage}%`
      progressbar.innerHTML = `${uploadpercentage}%`
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((coverpicture) => {
        progressbardiv.style.visibility = "hidden"
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
      progressbardiv.style.visibility = "visible"
      var uploadpercentage = Math.round(progress)
      progressbar.style.width = `${uploadpercentage}%`
      progressbar.innerHTML = `${uploadpercentage}%`
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((profilepicture) => {
        progressbardiv.style.visibility = "hidden"
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
          if (userdetails.data().uid === user.uid) {
            createpostinput.setAttribute("placeholder", `What's on your mind ${userdetails.data().Firstname} ${userdetails.data().Lastname}`)
          }
          //currentusercommentprofile
          if (userprofilesrc !== "") {
            document.getElementById("currentusercommentprofile").setAttribute("src", userprofilesrc)
          }
          //user profile Picture
          if (userprofilesrc !== "") {
            userprofileimg.setAttribute("src", userprofilesrc);
          }
          //user cover Picture
          if (usercoversrc !== "") {
            usercoverimg.setAttribute("src", usercoversrc);
          }

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
      updatedatabutton.addEventListener("click", () => {
        firebase.firestore().collection("users/").doc(user.uid).update({
          Firstname: document.getElementById("firstname").value,
          Lastname: document.getElementById("lastname").value,
          MobileNo: document.getElementById("mobileno").value,
          Description: document.getElementById("userdescription").value
        }).then(() => {
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
        .onSnapshot((allposts) => {
          document.getElementById("loaderdiv").style.display = "none"
          currentuserpost.innerHTML = ""
          let totalposts = []
          if (allposts.size === 0) {
            var messagediv = document.createElement("div");
            currentuserpost.appendChild(messagediv);
            messagediv.setAttribute("class", "messagediv")
            messagediv.style.fontWeight = "600"
            messagediv.style.display = "block"

            var messagetext = document.createTextNode("Data Not avilable");
            messagediv.appendChild(messagetext);
          } else {
            allposts.forEach((posts) => {
              totalposts.push(posts.data());
            });
              for (let postsindex = 0; postsindex < totalposts.length; postsindex++) {
              if (totalposts[postsindex].uid === user.uid) {
                let likary = totalposts[postsindex].Likes;
                let dislikeary = totalposts[postsindex].Dislikes;
                let commentary = totalposts[postsindex].Comments;
                var filetype = totalposts[postsindex].FileType;
                var filesrc = totalposts[postsindex].FileSrc;
                // user posts
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
                userprofile.setAttribute("class", "profilepicture");
                if (userprofilesrc === "") {
                  userprofile.setAttribute("src", "./../assessts/icons/user.png")
                } else {
                  userprofile.setAttribute("src", userprofilesrc)
                }

                var usernameanddetailsdiv = document.createElement("div");
                userdetails.appendChild(usernameanddetailsdiv);
                usernameanddetailsdiv.setAttribute("class"," col-6");
                usernameanddetailsdiv.style.marginLeft = "10px"

                var username = document.createElement("p");
                usernameanddetailsdiv.appendChild(username);
                username.setAttribute("class", "username");
                username.innerHTML = Name;

                var postdate = document.createElement("p");
                usernameanddetailsdiv.appendChild(postdate);
                postdate.setAttribute("class", "postdate");
                postdate.innerHTML = totalposts[postsindex].PostDate;

                var editanddeltebtndiv = document.createElement("div");
                userdetails.appendChild(editanddeltebtndiv);
                editanddeltebtndiv.setAttribute("class", "editanddeletbtn col-4");

                var editbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(editbtn);
                editbtn.setAttribute("class", "fa-solid fa-pencil postsbtn");
                editbtn.setAttribute("id", "editbtn");

                var deletbtn = document.createElement("i");
                editanddeltebtndiv.appendChild(deletbtn);
                deletbtn.setAttribute("class", "fa-solid fa-trash postsbtn");
                deletbtn.setAttribute("id", "deletebtn");
                deletbtn.style.marginLeft = "8px";

                if (totalposts[postsindex].Post !== "") {
                  var posttext = document.createElement("p");
                  post.appendChild(posttext);
                  posttext.setAttribute("class", "posttext col-12");
                  posttext.innerHTML =totalposts[postsindex].Post;
                } else if (totalposts[postsindex].filesrc !== "") {
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
                    source.setAttribute("src", totalposts[postsindex].FileSrc);
                    source.style.width = "100%";

                  }
                }

                var impressionsdiv = document.createElement("div");
                post.appendChild(impressionsdiv);
                impressionsdiv.setAttribute("class", "col-12 impressionsdiv");

                //like
                var likebutton = document.createElement("button");
                impressionsdiv.appendChild(likebutton);
                likebutton.setAttribute("class", "likebutton");

                var likeicons = document.createElement("i");
                likebutton.appendChild(likeicons);
                likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

                var liketitle = document.createElement("p");
                likebutton.appendChild(liketitle);
                liketitle.setAttribute("class", "impressionstitle");
                liketitle.innerHTML = `Like (${likary.length})`;
                for (let likeIndex = 0; likeIndex < likary.length; likeIndex++) {
                  if (likary[likeIndex] === user.uid) {
                    likeicons.style.color = "blue";
                    liketitle.style.color = "blue";
                  }
                }

                //disklike
                var disklikediv = document.createElement("div");
                impressionsdiv.appendChild(disklikediv);
                disklikediv.setAttribute("class", "disklikediv");

                var dislikeicon = document.createElement("i");
                disklikediv.appendChild(dislikeicon);
                dislikeicon.setAttribute(
                  "class",
                  "fa-regular fa-thumbs-down"
                );

                var diskliketitle = document.createElement("p");
                disklikediv.appendChild(diskliketitle);
                diskliketitle.setAttribute("class", "impressionstitle");
                diskliketitle.innerHTML = `Dislike (${dislikeary.length})`;

                for (
                  let dislikeindex = 0;
                  dislikeindex < dislikeary.length;
                  dislikeindex++
                ) {
                  if (dislikeary[dislikeindex] === user.uid) {
                    dislikeicon.style.color = "blue";
                    diskliketitle.style.color = "blue";
                  }
                }

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
                commenttitle.innerHTML = `Comment (${commentary.length})`;

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
                currentusercommentinput.setAttribute("id" , `commentdata${postsindex}`)

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
                //like function
                likebutton.addEventListener("click", () => {
                  let like = false;
                  for (
                    let likeIndex = 0;
                    likeIndex < likary.length;
                    likeIndex++
                  ) {
                    if (likary[likeIndex] === user.uid) {
                      like = true;
                      likary.splice(likeIndex, 1);
                    }
                  }
                  if (!like) {
                    likary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Likes: likary,
                    });
                });

                //Dislike
                disklikediv.addEventListener("click", () => {
                  let dislike = false;
                  for (
                    let dislikeIndex = 0;
                    dislikeIndex < dislikeary.length;
                    dislikeIndex++
                  ) {
                    if (dislikeary[dislikeIndex] === user.uid) {
                      dislike = true;
                      dislikeary.splice(dislikeIndex, 1);
                    }
                  }
                  if (!dislike) {
                    dislikeary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Dislikes: dislikeary,
                    });
                });
                //comment
                currentusercommentsendbutton.addEventListener("click", () => {
                  let targetcommentdata = document.getElementById(`commentdata${postsindex}`)
                  if (targetcommentdata.value === "") {
                    alert("Please write something.....!")
                  } else {
                    let Comment = {
                      comment: targetcommentdata.value,
                      uid: user.uid
                    }
                    commentary.push(Comment)
                    //update comment in firebase
                    firebase.firestore().collection("posts/").doc(totalposts[postsindex].id).update({
                      Comments: commentary
                    })
                  }
                })
              } else {
                document.getElementById("messagediv").style.display = "block"
              }
            }
          }
        });
    } else {
      window.location.assign("./../pages/emailverified.html");
    }
  } else {
    window.location.assign("./../pages/Login.html");
  }
});
