import React from "react";
import { useSelector } from "react-redux";
import HorizontalCard from "../common/HorizontalCard";

const FlowArea = () => {
  const { customNews } = useSelector((state) => state.data);

  return (
    <div className="flowContentWrapper">
      {customNews.length > 0 ? (
        customNews.map((staticNews, index) => {
          return <HorizontalCard staticNews={staticNews} key={index} />;
        })
      ) : (
        <span>You should make a choice..</span>
      )}
    </div>
  );
};

export default FlowArea;
