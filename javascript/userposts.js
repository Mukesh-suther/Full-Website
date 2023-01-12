let currentusername = "";
let userprofilesrc = "";
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      var postsdiv = document.getElementById("userposts");
      //get user name
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((doc) => {
          doc.forEach((users) => {
            if (users.data().uid === user.uid) {
              currentusername =
                users.data().Firstname + " " + users.data().Lastname;
              userprofilesrc = users.data().ProfilePicture;
            }
          });
        });
      //get user data
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((allpostsposts) => {
          postsdiv.innerHTML = "";
          var totalposts = []
          document.getElementById("loaderdiv").style.display = "none";
          if (allpostsposts.size === 0) {
            document.getElementById("message").style.display = "block";
          } else {
            allpostsposts.forEach((posts) => {
              totalposts.push(posts.data())
            })
            for (let postsindex = 0; postsindex < totalposts.length; postsindex++) {
              if (totalposts[postsindex].uid === user.uid) {
                var Likeary = totalposts[postsindex].Likes;
                var Dislikeary = totalposts[postsindex].Dislikes;
                var Commentary = totalposts[postsindex].Comments;
                document.getElementById("messagediv").style.display = "none";
                var post = document.createElement("div");
                postsdiv.appendChild(post);
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
                userprofile.setAttribute("src", "./../assessts/icons/user.png");
                if (userprofilesrc !== "") {
                  userprofile.setAttribute("src", userprofilesrc);
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
                username.innerHTML = currentusername;

                var postdate = document.createElement("p");
                usernameanddetailsdiv.appendChild(postdate);
                postdate.setAttribute("class", "postdate");
                postdate.innerHTML = totalposts[postsindex].PostDate;
                if (totalposts[postsindex].Post !== ""){
                var posttext = document.createElement("p");
                post.appendChild(posttext);
                posttext.setAttribute("class", "posttext col-12");
                posttext.innerHTML = totalposts[postsindex].Post;
                }
                if (totalposts[postsindex].FileSrc !== "") {
                  var postfilediv = document.createElement("div");
                  post.appendChild(postfilediv);
                  postfilediv.setAttribute("class", "col-12");
                  postfilediv.setAttribute("id", "postfilediv");

                  if (
                    totalposts[postsindex].FileType === "image/png" ||
                    totalposts[postsindex].FileType === "image/jpeg" ||
                    totalposts[postsindex].FileType === "image/jpg" ||
                    totalposts[postsindex].FileType === "image/webp"
                  ) {
                    var postimage = document.createElement("img");
                    postfilediv.appendChild(postimage);
                    postimage.setAttribute("class", "posttext col-12");
                    postimage.setAttribute("src", totalposts[postsindex].FileSrc);
                  } else {
                    let postvideo = document.createElement("video");
                    postfilediv.appendChild(postvideo);
                    postvideo.setAttribute("controls", "true");
                    postvideo.setAttribute("class", "postVideo");
                    let source = document.createElement("source");
                    postvideo.appendChild(source);
                    source.setAttribute("src", totalposts[postsindex].FileSrc);
                    source.setAttribute("type", "video");
                  }
                }
                var fotter = document.createElement("div");
                post.appendChild(fotter);
                fotter.setAttribute("class", "col-12 impressionsdiv");

                //like
                var likebutton = document.createElement("button");
                fotter.appendChild(likebutton);
                likebutton.setAttribute("class", "likebutton");

                var likeicons = document.createElement("i");
                likebutton.appendChild(likeicons);
                likeicons.setAttribute("class", "fa-regular fa-thumbs-up");

                var liketitle = document.createElement("p");
                likebutton.appendChild(liketitle);
                liketitle.setAttribute("class", "impressionstitle");
                liketitle.innerHTML = `Like (${Likeary.length})`;

                for (let likeIndex = 0; likeIndex < Likeary.length; likeIndex++) {
                  if (Likeary[likeIndex] === user.uid) {
                    likeicons.style.color = "blue";
                    liketitle.style.color = "blue";
                  }
                }

                //disklike
                var disklikediv = document.createElement("div");
                fotter.appendChild(disklikediv);
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
                diskliketitle.innerHTML = `Dislike (${Dislikeary.length})`;
                for (
                  let dislikeindex = 0;
                  dislikeindex < Dislikeary.length;
                  dislikeindex++
                ) {
                  if (Dislikeary[dislikeindex] === user.uid) {
                    dislikeicon.style.color = "blue";
                    diskliketitle.style.color = "blue";
                  }
                }
                //comment
                var commentdiv = document.createElement("div");
                fotter.appendChild(commentdiv);
                commentdiv.setAttribute("class", "commentdiv");

                var commenticon = document.createElement("i");
                commentdiv.appendChild(commenticon);
                commenticon.setAttribute("class", "fa-regular fa-message");

                var commenttitle = document.createElement("p");
                commentdiv.appendChild(commenttitle);
                commenttitle.setAttribute("class", "impressionstitle");
                commenttitle.innerHTML = `Comment (${Commentary.length})`;

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
                currentusercommentinput.setAttribute(
                  "id",
                  `commentdata${postsindex}`
                );
                var currentusercommentsendbutton = document.createElement("button");
                currentusercommentdiv.appendChild(currentusercommentsendbutton);
                currentusercommentsendbutton.setAttribute("class", "currentusercommentsendbutton");
                currentusercommentsendbutton.setAttribute("id", postsindex);

                var currentusercommentsendbuttonimg =
                  document.createElement("postindex");
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
                    likeIndex < Likeary.length;
                    likeIndex++
                  ) {
                    if (Likeary[likeIndex] === user.uid) {
                      like = true;
                      Likeary.splice(likeIndex, 1);
                    }
                  }
                  if (!like) {
                    Likeary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Likes: Likeary,
                    });
                });

                //Dislike
                disklikediv.addEventListener("click", () => {
                  let dislike = false;
                  for (
                    let dislikeIndex = 0;
                    dislikeIndex < Dislikeary.length;
                    dislikeIndex++
                  ) {
                    if (Dislikeary[dislikeIndex] === user.uid) {
                      dislike = true;
                      Dislikeary.splice(dislikeIndex, 1);
                    }
                  }
                  if (!dislike) {
                    Dislikeary.push(user.uid);
                  }
                  firebase
                    .firestore()
                    .collection("posts/")
                    .doc(totalposts[postsindex].id)
                    .update({
                      Dislikes: Dislikeary,
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
                    Commentary.push(Comment)
                    //update comment in firebase
                    firebase.firestore().collection("posts/").doc(totalposts[postsindex].id).update({
                      Comments: Commentary
                    })
                  }
                })
              } else {
                document.getElementById("message").style.display = "block";
              }
              // });
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
