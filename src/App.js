import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./component/Posts";
import Story from "./component/Story";
import SuggestionFollow from "./component/SuggestionFollow";
import { db, auth } from "./config/firebase";
import Modal from "@material-ui/core/Modal";
import ImageUploader from "./component/ImageUploader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// authenticaion button and modal styles

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);

  // auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user has logged in ...
        setUser(authUser);
      } else {
        // user has logged out ...
        setUser(null);
      }
    });
    return () => {
      //perform cleanup actions
      unsubscribe();
    };
  }, [user]);

  // fetch post in database
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          }))
        );
      });
  }, []);

  // create user account using auth and using signUp function
  const signUp = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch(error => alert(error.message));
    setOpen(false);
  };

  // handle user signIn function
  const signIn = event => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(error => alert(error.message));
    setSignInOpen(false);
  };

  return (
    <div className="App">
      <div className="app__header">
        <img className="header__image" src="logo.png" alt="" />
        {/* check if user logged out so its show signIn and signUp button else its show signOut button*/}
        <div className="userAuth__btn">
          {!user ? (
            <div className="userSign__btn">
              <button className="signUp__btn" onClick={() => setOpen(true)}>
                Sign Up
              </button>
              <button
                className="signIn__btn"
                onClick={() => setSignInOpen(true)}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="avatar__loggedIn">
              <HomeIcon fontSize="large" />
              <TelegramIcon fontSize="large" />
              <ExploreOutlinedIcon fontSize="large" />
              <FavoriteBorderIcon fontSize="large" />
              <Avatar
                alt={user.displayName}
                src="/static/images/avatar/1.jpg"
              />
              <button className="signOut__btn" onClick={() => auth.signOut()}>
                Sign Out
              </button>
            </div>
          )}
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="signUp">
            <img className="header__image" src="logo.png" alt="" />
            <form className="signUp__form" onSubmit={signUp}>
              <input
                type="text"
                placeholder="Enter username"
                onChange={event => setUsername(event.target.value)}
              />
              <input
                type="email"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                onChange={event => setPassword(event.target.value)}
              />
              <input
                type="submit"
                value="Sign Up"
                className="signUp__submit_btn"
              />
            </form>
          </div>
        </Modal>
        <Modal
          open={signInOpen}
          onClose={() => setSignInOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="signUp">
            <img className="header__image" src="logo.png" alt="" />
            <form className="signUp__form" onSubmit={signIn}>
              <input
                type="email"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                onChange={event => setPassword(event.target.value)}
              />
              <input
                type="submit"
                value="Sign In"
                className="signUp__submit_btn"
              />
            </form>
          </div>
        </Modal>
      </div>
      {/* image uploader component */}

      {user?.displayName ? (
        <>
          <Story />
          <ImageUploader username={user.displayName} />
        </>
      ) : (
        <h3 className="image__loader_logout">
          Sorry you need to login to upload.
        </h3>
      )}

      <div className={user ? "user__posts_with_user" : "user__posts"}>
        {//eslint-disable-next-line
        posts == false ? (
          <div className="post__loader">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          posts.map(({ id, post }) => (
            <Posts
              key={id}
              postId={id}
              user={user}
              username={post.username}
              imgUrl={post.imgUrl}
              caption={post.caption}
            />
          ))
        )}
      </div>

      {user?.displayName ? <SuggestionFollow user={user} /> : ""}
    </div>
  );
}

export default App;
