import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VerticalCard from "../components/common/VerticalCard";
import Select from "../components/filter/Select";
import DateSelect from "../components/filter/DateSelect";
import moment from "moment";
import {
  BASE_URL_1,
  BASE_URL_2,
  BASE_URL_3,
  fetchFilteredNews,
} from "../redux/dataSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Filter = () => {
  const { sources, allFilteredNews } = useSelector((state) => state.data);
  const location = useLocation();
  const dispatch = useDispatch();

  let query = useQuery();
  let baseUrl1;
  let baseUrl2;
  let baseUrl3;

  const setPath = () => {
    let tempQuery = query.get("q");

    baseUrl1 = `${BASE_URL_1}&q=${tempQuery}`;
    baseUrl2 = `${BASE_URL_2}&q=${tempQuery}`;
    baseUrl3 = `${BASE_URL_3}&q=${tempQuery}`;

    if (query.get("from")) {
      let fromQuery = query.get("from");
      let toQuery = query.get("to");

      const fromQueryForNY = moment(fromQuery).format("YYYYMMDD");
      const toQueryForNY = moment(toQuery).format("YYYYMMDD");

      baseUrl1 += `&from=${fromQuery}&to=${toQuery}`;
      baseUrl2 += `&begin_date=${fromQueryForNY}&end_date=${toQueryForNY}`;
      baseUrl3 += `&from-date=${fromQuery}&to-date=${toQuery}`;
    }
  };

  const fetchNews = () => {
    dispatch(fetchFilteredNews({ url: baseUrl1, source: "newsApi" }));
    dispatch(fetchFilteredNews({ url: baseUrl2, source: "nyTimes" }));
    dispatch(fetchFilteredNews({ url: baseUrl3, source: "guardian" }));
  };

  useEffect(() => {
    setPath();
    fetchNews();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location, query]);

  return (
    <div className="filterAreaWrapper">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="filterArea">
              <div className="filterAreaTop">
                <div className="filterAreaTopLeft">
                  <Select />
                  <DateSelect />
                </div>
                <div className="filterAreaTopRight">
                  {sources?.length > 0 && (
                    <span className="source">
                      <strong>{sources.length} </strong>
                      Sources Exist
                    </span>
                  )}
                  {allFilteredNews.length > 0 ? (
                    <span>
                      <strong>{allFilteredNews.length} </strong>
                      News Exist
                    </span>
                  ) : (
                    "No News Found.."
                  )}
                </div>
              </div>
              <div className="innerFilterAreaWrapper row">
                {allFilteredNews?.length > 0
                  ? allFilteredNews?.map((news, index) => (
                      <VerticalCard news={news} key={index} />
                    ))
                  : "No News Found.."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
