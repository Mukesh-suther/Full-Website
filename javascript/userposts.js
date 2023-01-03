let currentusername = "";
let userprofilesrc = "";
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        var postsdiv = document.getElementById("postsdiv");
        //get user name
        firebase.firestore().collection("users/").onSnapshot((doc)=>{
          doc.forEach((users) => {
            if(users.data().uid === user.uid){
              currentusername = users.data().Firstname + " " + users.data().Lastname
              userprofilesrc = users.data().ProfilePicture
            }
          });
        })
        //get user data
        firebase
          .firestore()
          .collection("posts/")
          .onSnapshot((usersposts) => {
            if(usersposts.size === 0){
              document.getElementById("messagediv").style.display = "block";
              document.getElementById("loaderdiv").style.display = "none";
            }else{              
              document.getElementById("loaderdiv").style.display = "none";
              document.getElementById("messagediv").style.display = "none";
            usersposts.forEach((posts) => {
              if(posts.data().uid === user.uid){
                if(posts.data().Post === "" && posts.data().FileSrc === ""){
                  document.getElementById("loaderdiv").style.display = "none";
                  document.getElementById("messagediv").style.display = "block";
                }else{
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
                userprofile.setAttribute("class", "postuserprofile");
                userprofile.setAttribute("src" , "./../assessts/icons/user.png")
                if(userprofilesrc !== ""){
                  userprofile.setAttribute("src" , userprofilesrc)
                }
          
                var usernameanddetailsdiv = document.createElement("div");
                userdetails.appendChild(usernameanddetailsdiv);
                usernameanddetailsdiv.setAttribute("class", "usernameanddetailsdiv");
    
                var username = document.createElement("p");
                usernameanddetailsdiv.appendChild(username);
                username.setAttribute("class", "username");
                username.innerHTML = currentusername;
    
          
                var postdate = document.createElement("p");
                usernameanddetailsdiv.appendChild(postdate);
                postdate.setAttribute("class", "postdate");
                postdate.innerHTML = "10-12-2022";
          
                var posttext = document.createElement("p");
                post.appendChild(posttext);
                posttext.setAttribute("class", "posttext col-12");
                posttext.innerHTML = posts.data().Post;
                if(posts.data().FileSrc !== ""){
                  var postfilediv = document.createElement("div");
                  post.appendChild(postfilediv);
                  postfilediv.setAttribute("class" , "col-12")
                  postfilediv.setAttribute("id" , "postfilediv");
    
                  if (
                    posts.data().FileType === "image/png" ||
                    posts.data().FileType === "image/jpeg" ||
                    posts.data().FileType === "image/jpg" ||
                    posts.data().FileType === "image/webp"
                  ) {
                    var postimage = document.createElement("img");
                    postfilediv.appendChild(postimage);
                    postimage.setAttribute("class", "posttext col-12");
                    postimage.setAttribute("src", posts.data().FileSrc)
                  } else {
                    let postvideo = document.createElement("video");
                    postfilediv.appendChild(postvideo);
                    postvideo.setAttribute("controls", "true");
                    postvideo.setAttribute("class", "postVideo");
                    let source = document.createElement("source");
                    postvideo.appendChild(source);
                    source.setAttribute("src", posts.data().FileSrc);
                    source.setAttribute("type", "video");
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
                dislikelikeicon.setAttribute("class", "fa-regular fa-thumbs-down");
          
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
                commenttitle.innerHTML = "Comment (0)"
              }
              }
            });}
        })}
    else{
        window.location.assign("./../pages/emailverified.html")
    }}
    else{
        window.location.assign("./../pages/Login.html")
    }
    })
 