import { React } from "react";
import PinButton from "./PinButton";

const VerticalCard = ({ news }) => {
  return (
    <>
      <div className="col-6 col-md-4 col-lg-3">
        <div className="verticalCardWrapper">
          <div className="verticalCardImage">
            <img src={news?.image} alt="" />
          </div>
          <div className="verticalCardBody">
            <div className="title">{news?.title}</div>
            <div className="description">{news?.description}</div>
            <div className="pinAndSourceWrapper">
              <PinButton currentNews={news} />
              <div className="source">{news?.source}</div>
            </div>
            <a href={news?.url} target="_blank" className="button">
              Go To Web Site
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalCard;
