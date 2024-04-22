import React, { useEffect, useState } from "react";
import RecommendArea from "../components/recommend/RecommendArea";
import PinnedArea from "../components/PinnedArea";
import FlowMain from "../components/flow/FlowMain";

const Main = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [currentTitle, setCurrentTitle] = useState("Recommend");

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <div className="container mainPage">
      {!isMobile ? (
        <div className="row">
          <div className="col-md-4">
            <RecommendArea />
          </div>
          <div className="col-md-4">
            <FlowMain />
          </div>
          <div className="col-md-4">
            <PinnedArea />
          </div>
        </div>
      ) : (
        <div className="mainMobileWrapper">
          <ul className="mainMobileSelect">
            <li
              className={currentTitle === "Recommend" ? "active" : ""}
              onClick={() => setCurrentTitle("Recommend")}
            >
              Recommend
            </li>
            <li
              className={currentTitle === "Flow" ? "active" : ""}
              onClick={() => setCurrentTitle("Flow")}
            >
              Flow
            </li>
            <li
              className={currentTitle === "Pinned" ? "active" : ""}
              onClick={() => setCurrentTitle("Pinned")}
            >
              Pinned
            </li>
          </ul>
          <div className="mainMobileInnerWrapper">
            {currentTitle === "Recommend" ? (
              <RecommendArea />
            ) : currentTitle === "Flow" ? (
              <FlowMain />
            ) : currentTitle === "Pinned" ? (
              <PinnedArea />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
