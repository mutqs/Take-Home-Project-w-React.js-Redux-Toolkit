import React from "react";
import FlowFilter from "./FlowFilter";
import FlowArea from "./FlowArea";

const FlowMain = () => {
  return (
    <div className="flowMainWrapper">
      <div className="flowMainTitle">Personalize your feed..</div>
      <FlowFilter />
      <FlowArea />
    </div>
  );
};

export default FlowMain;
