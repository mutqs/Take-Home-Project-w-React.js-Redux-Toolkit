import React from "react";
import { useSelector } from "react-redux";
import VerticalCard from "../components/common/VerticalCard";

const Pins = () => {
  const { pinnedNews } = useSelector((state) => state.data);

  return (
    <div className="pinsAreaWrapper">
      <div className="container pinsPage">
        <div className="pinsAreaTitle">Your Pins..</div>
        <div className="pinsContentWrapper row">
          {pinnedNews?.length > 0 ? (
            pinnedNews?.map((news, index) => (
              <VerticalCard news={news} key={index} />
            ))
          ) : (
            <span className="col">No Pins Found..</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pins;
