import React from "react";
import "./Story.css";

export const stories = [
  {
    storyImg: "./images/ertugral.jpg",
    storyName: "erturgral..."
  },
  {
    storyImg: "./images/babar.jpeg",
    storyName: "babaraz..."
  },
  {
    storyImg: "./images/erdogan.jpg",
    storyName: "tayyaber..."
  },
  {
    storyImg: "./images/imran.jpg",
    storyName: "imrankh..."
  },
  {
    storyImg: "./images/bajwa.jpg",
    storyName: "qamarba..."
  },
  {
    storyImg: "./images/turgut.jpg",
    storyName: "turgut"
  },
  {
    storyImg: "./images/shahid.jpg",
    storyName: "shahidafr..."
  },
  {
    storyImg: "./images/ertugralgazi.jpg",
    storyName: "ertugral"
  }
];

const Story = () => {
  return (
    <div className="story">
      {stories.map((story, ind) => (
        <div className="story__container" key={ind} >
          <div className="story__img">
            <img src={story.storyImg} alt="story" />
          </div>
          <span>{story.storyName}</span>
        </div>
      ))}
    </div>
  );
};

export default Story;
