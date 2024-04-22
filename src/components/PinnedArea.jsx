import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalCard from "./common/HorizontalCard";

const PinnedArea = () => {
  const { pinnedNews } = useSelector((state) => state.data);
  const navigate = useNavigate();

  const routeFilter = () => {
    navigate(`/pins`, { replace: true });
  };

  return (
    <div className="pinnedBoxWrapper">
      <span className="pinnedBoxTitle">
        <span>Pinned News..</span>
        <span onClick={() => routeFilter()} className="route">
          for all..
        </span>
      </span>
      <div className="pinnedBoxContent">
        {pinnedNews.length > 0
          ? pinnedNews.map((staticNews, index) => (
              <HorizontalCard staticNews={staticNews} key={index} />
            ))
          : "No News Pinned Yet.."}
      </div>
    </div>
  );
};

export default PinnedArea;
