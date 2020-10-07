import React, { useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../config/firebase";
import firebase from "firebase";
import MoreHorizSharpIcon from "@material-ui/icons/MoreHorizSharp";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const Posts = ({ username, postId, user, imgUrl, caption }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // get post comment to firebase database
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        });
    }
    return () => {
      // cleanup
      unsubscribe();
    };
  }, [postId]);
  //post comments
  const handleComments = event => {
    event.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        comment: comment
      });
    setComment("");
  };

  return (
    <div className="posts">
      <div className="posts_userInfo">
        <div className="posts_userInfo_left">
          <Avatar alt={username} src="/static/images/avatar/1.jpg" />
          <h4>{username}</h4>
        </div>
        <div className="posts_userInfo_right">
          <MoreHorizSharpIcon />
        </div>
      </div>
      <img className="post__image" src={imgUrl} alt="post" />
      <div className="post__icons">
        <div className="left__post_icon">
          <FavoriteBorderSharpIcon />
          <ChatBubbleOutlineRoundedIcon />
          <TelegramIcon />
        </div>
        <div className="right__post_icon">
          <BookmarkBorderIcon />
        </div>
      </div>
      <p className="post__caption">
        <strong>{username}</strong> {caption}
      </p>
      <div className="post__comment">
        {comments.map((comment, ind) => (
          <p key={ind}>
            <strong>{comment.user} </strong>
            {comment.comment}{" "}
          </p>
        ))}
      </div>
      {user ? (
        <div className="comments__field">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
          <button onClick={handleComments} disabled={!comment}>
            Post
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Posts;
