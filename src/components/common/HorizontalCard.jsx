import React from "react";
import PinButton from "./PinButton";

const HorizontalCard = ({ staticNews }) => {
  return (
    <>
      <div className="horizontalCardWrapper">
        <div className="horizontalCardTop">
          <div className="recommendTopLeftArea">
            <div className="horizontalCardImage">
              <img src={staticNews?.image} alt="" />
            </div>
            <PinButton currentNews={staticNews} />
          </div>
          <div className="horizontalCardBody">
            <div className="title">{staticNews?.title}</div>
            <div className="description">{staticNews?.description}</div>
            <div className="source">{staticNews?.source}</div>
          </div>
        </div>
        <a href={staticNews?.url} target="_blank" className="button">
          Go To Web Site
        </a>
      </div>
    </>
  );
};

export default HorizontalCard;
