import React, { useState } from "react";
import "./ImageUploader.css";
import { storage, db } from "../config/firebase";
import firebase from "firebase";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const ImageUploader = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);

  const uploadFile = event => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // handle user file uploader like image or video
  const fileCaptionHandler = event => {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      //'state_changed' observer, called any time the state changes
      "state_changed",
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      error => {
        // Handle unsuccessful uploads
        alert(error.message);
      },
      () => {
        // Handle successful uploads on complete
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            // add download image url and caption into database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imgUrl: url,
              username: username
            });
            setProgress(0);
            setCaption("");
            setFile(null);
          });
      }
    );
  };

  return (
    <div className="main__file_uploader">
      <form onSubmit={fileCaptionHandler}>
        <div className="file__uploader">
          <h2>Create a Post</h2>
          <input
            type="text"
            className="file__caption"
            placeholder="Write Caption here ..."
            value={caption}
            required
            onChange={event => setCaption(event.target.value)}
          />
          <div className="file__uploader_container">
            <input
              accept="image/*"
              required
              className="upload__input_file"
              id="icon-button-file"
              type="file"
              onChange={uploadFile}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>

            <input type="submit" className="upload__btn" value="Upload" />
          </div>

          <progress
            className="file__uploader_progress"
            value={progress}
            max="100"
          />
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;
