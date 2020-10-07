import React from "react";
import "./SuggestionFollow.css";
import Avatar from "@material-ui/core/Avatar";
import { stories } from "./Story";

const SuggestionFollow = ({ user }) => {
  return (
    <div className="right__section">
      <div className="avatar__loggedIn">
        <Avatar alt={user.displayName} src="/static/images/avatar/1.jpg" />
        <div className="posts_userInfo">
          <h4>{user.displayName}</h4>
          <span className="avatar__email">{user.email}</span>
        </div>
      </div>
      <div className="suggestion__container">
        <div className="suggestion__heading">
          <h4>Suggestions For You</h4>
          <p>See All</p>
        </div>
        {stories.map((story, ind) => (
          <div className="suggestion__people_container" key={ind} >
            <div className="suggestion__people" key={ind}>
              <Avatar alt={story.storyImg} src={story.storyImg} />
              <div className="posts_userInfo">
                <h4>{story.storyName}</h4>
                <span>Suggested for you</span>
              </div>
            </div>
            <p>Follow</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionFollow;
