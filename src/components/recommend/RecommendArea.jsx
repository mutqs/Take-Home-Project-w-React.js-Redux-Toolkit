import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BASE_URL_1,
  BASE_URL_2,
  BASE_URL_3,
  dischargeFilteredNews,
  dischargeDatas,
  fetchFilteredNews,
} from "../../redux/dataSlice";

import HorizontalCard from "../common/HorizontalCard";

const RecommendArea = () => {
  const [staticNewsArr1, setStaticNewsArr1] = useState([]);
  const [staticNewsArr2, setStaticNewsArr2] = useState([]);
  const [staticNewsArr3, setStaticNewsArr3] = useState([]);
  const recommendTitleData = ["Apple", "Tesla", "Joker"];

  const { staticNews } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let baseUrl1;
  let baseUrl2;
  let baseUrl3;

  const setPathAndFetch = () => {
    recommendTitleData.forEach((x) => {
      baseUrl1 = `${BASE_URL_1}&q=${x}`;
      dispatch(
        fetchFilteredNews({ url: baseUrl1, source: "newsApi", index: 0 })
      );
    });
    recommendTitleData.forEach((x) => {
      baseUrl2 = `${BASE_URL_2}&q=${x}`;
      dispatch(
        fetchFilteredNews({ url: baseUrl2, source: "nyTimes", index: 1 })
      );
    });
    recommendTitleData.forEach((x) => {
      baseUrl3 = `${BASE_URL_3}&q=${x}`;
      dispatch(
        fetchFilteredNews({ url: baseUrl3, source: "guardian", index: 2 })
      );
    });
  };

  const routeFilter = (query) => {
    navigate(`/news?&q=${query}`);
    dispatch(dischargeDatas());
    dispatch(dischargeFilteredNews());
  };

  const filterByQuery = () => {
    staticNews.forEach((x) => {
      // console.log(x.title);
      if (x.title.includes("Apple")) {
        setStaticNewsArr1((prevState) => [...prevState, x]);
      } else if (x.title.includes("Tesla")) {
        setStaticNewsArr2((prevState) => [...prevState, x]);
      } else if (x.title.includes("Joker")) {
        setStaticNewsArr3((prevState) => [...prevState, x]);
      }
    });
  };

  useEffect(() => {
    filterByQuery();
    console.log("staticNews.length", staticNews.length);
  }, [staticNews]);

  useEffect(() => {
    setPathAndFetch();
    // if (staticNews.length == 0) {
    // } else {
    //   setTimeout(() => {
    //     filterByQuery();
    //     console.log("inside");
    //   }, 500);
    // }
    console.log("staticNews.length", staticNews.length);
  }, []);

  return (
    <div className="recommendAreaWrapper">
      <div className="title">Recommended For You..</div>
      <div className="content">
        {staticNewsArr1.length ? (
          <div className="recommendedBoxWrapper">
            <span className="recommendedBoxTitle">
              <span className="main">{recommendTitleData[0]} News..</span>
              <span
                onClick={() => routeFilter(recommendTitleData[0])}
                className="route"
              >
                for all..
              </span>
            </span>
            <div className="recommendedBoxContent">
              {staticNewsArr1 &&
                staticNewsArr1.map((staticNews, index) => {
                  if (index < 10) {
                    return (
                      <HorizontalCard staticNews={staticNews} key={index} />
                    );
                  }
                })}
            </div>
          </div>
        ) : (
          ""
        )}
        {staticNewsArr2 && (
          <div className="recommendedBoxWrapper">
            <span className="recommendedBoxTitle">
              <span className="main">{recommendTitleData[1]} News..</span>
              <span
                onClick={() => routeFilter(recommendTitleData[1])}
                className="route"
              >
                for all..
              </span>
            </span>
            <div className="recommendedBoxContent">
              {staticNewsArr2 &&
                staticNewsArr2.map((staticNews, index) => {
                  if (index < 10) {
                    return (
                      <HorizontalCard staticNews={staticNews} key={index} />
                    );
                  }
                })}
            </div>
          </div>
        )}
        {staticNewsArr3 && (
          <div className="recommendedBoxWrapper">
            <span className="recommendedBoxTitle">
              <span className="main">{recommendTitleData[2]} News..</span>
              <span
                onClick={() => routeFilter(recommendTitleData[2])}
                className="route"
              >
                for all..
              </span>
            </span>
            <div className="recommendedBoxContent">
              {staticNewsArr3 &&
                staticNewsArr3.map((staticNews, index) => {
                  if (index < 10) {
                    return (
                      <HorizontalCard staticNews={staticNews} key={index} />
                    );
                  }
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendArea;
