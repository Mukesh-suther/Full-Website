let userprofilesrc = "";
let alluser = [];
let createpostinput = document.getElementById("createpostdiv");
let currentuserprofile = document.getElementById("usercommentimage");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      firebase
        .firestore()
        .collection("users/")
        .onSnapshot((doc) => {
          doc.forEach((users) => {
            alluser.push(users.data())
            Filetype = users.data().FileType;
            if (users.data().uid === user.uid) {
              createpostinput.setAttribute(
                "placeholder",
                `What's on Your mind ${
                  users.data().Firstname + " " + users.data().Lastname
                }`
              );
              if (users.data().ProfilePicture !== "") {
                currentuserprofile.setAttribute(
                  "src",
                  users.data().ProfilePicture
                );
              }
            }
          });
        });
        console.log(alluser)
      //Posts
      firebase
        .firestore()
        .collection("posts/")
        .onSnapshot((doc) => {
          document.getElementById("loaderdiv").style.display = "none";
          var allposts = [];
          if (doc.size === 0) {
            document.getElementById("messagediv").style.display = "block";
          } else {
            doc.forEach((posts) => {
              allposts.push(posts.data());
            });
            for (let i = 0; i < allposts.length; i++) {
              var post = document.createElement("div");
              postsdiv.appendChild(post);
              post.setAttribute("class", "post col-12");

              var postheader = document.createElement("div");
              post.appendChild(postheader);
              postheader.setAttribute("class", "userdetailsdiv col-12");

              var userprofilediv = document.createElement("div");
              postheader.appendChild(userprofilediv);
              userprofilediv.setAttribute("class", "userprofilediv col-2");

              var userprofile = document.createElement("img");
              userprofilediv.appendChild(userprofile);
              userprofile.setAttribute("src", "./assessts/icons/user.png");
              userprofile.setAttribute("class", "postuserprofile");
              for (let b = 0; b < alluser.length; b++) {
                if(alluser[b].uid === allposts[i].uid){
                  if(alluser[b].ProfilePicture !== ""){
                  userprofile.setAttribute("src" , alluser[b].ProfilePicture)
                  }
                }
              }

              var usernameanddetailsdiv = document.createElement("div");
              postheader.appendChild(usernameanddetailsdiv);
              usernameanddetailsdiv.setAttribute(
                "class",
                "usernameanddetailsdiv"
              );
              var username = document.createElement("p");
              usernameanddetailsdiv.appendChild(username);
              username.setAttribute("class", "username");
              for (let b = 0; b < alluser.length; b++) {
                if(alluser[b].uid === allposts[i].uid){
                  username.innerHTML = alluser[b].Firstname + " " + alluser[b].Lastname;
                }
              }
              var postdate = document.createElement("p");
              usernameanddetailsdiv.appendChild(postdate);
              postdate.setAttribute("class", "postdate");
              postdate.innerHTML = "10-12-2022";
              if (allposts[i].Post !== "") {
                var posttext = document.createElement("p");
                post.appendChild(posttext);
                posttext.setAttribute("class", "posttext col-12");
                posttext.innerHTML = allposts[i].Post;
              } else if (allposts[i].FileSrc !== "") {
                if (
                  allposts[i].FileType === "image/png" ||
                  allposts[i].FileType === "image/jpeg" ||
                  allposts[i].FileType === "image/jpg" ||
                  allposts[i].FileType === "image/webp"
                ) {
                  var postimage = document.createElement("img");
                  post.appendChild(postimage);
                  postimage.setAttribute("class", "posttext col-12");
                  postimage.setAttribute("src", allposts[i].FileSrc);
                } else {
                  let postvideo = document.createElement("video");
                  post.appendChild(postvideo);
                  postvideo.setAttribute("controls", "true");
                  postvideo.setAttribute("class", "postVideo");
                  let source = document.createElement("source");
                  postvideo.appendChild(source);
                  source.setAttribute("src", allposts[i].FileSrc);
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
            }
          }
        });
    } else {
      window.location.assign("./../pages/emailverified.html");
    }
  } else {
    window.location.assign("./pages/Login.html");
  }
});
