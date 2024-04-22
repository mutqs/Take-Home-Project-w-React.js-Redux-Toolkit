import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { dischargeDatas, setResetFlag } from "../../redux/dataSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Footer = () => {
  const [keyword, setKeyword] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let query = useQuery();

  const onChangeForKeyword = (value) => {
    setKeyword(value);
  };
  const resetRoute = () => {
    navigate("/");
    fillKeyword();
  };

  const fillKeyword = () => {
    if (query?.get("q")) {
      setKeyword(query.get("q"));
    } else {
      setKeyword("");
    }
  };

  const routeSearching = (e) => {
    if (keyword === "") {
      setAlertStatus(true);
      setTimeout(() => {
        setAlertStatus(false);
      }, 2000);
    } else {
      dispatch(dischargeDatas());
      dispatch(setResetFlag(false));
      navigate(`/news?&q=${keyword.trim()}`);
      setKeyword(`${keyword.trim()}`);
      setAlertStatus(false);
    }
    e.preventDefault();
  };

  useEffect(() => {
    fillKeyword();
  }, [query]);

  return (
    <div className="footerWrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <div onClick={() => resetRoute()} className="footerLeftWrapper">
              <svg height="50" width="50" viewBox="0 0 512 512">
                <path
                  fill="#ffffff"
                  d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                />
              </svg>
              <h3 className="footerInfo">Take-Home Project</h3>
            </div>
          </div>
          <div className="col-12 offset-md-6 col-md-3">
            <div className="footerRightWrapper">
              <div className="searchArea">
                <form onSubmit={(e) => routeSearching(e)} action="submit">
                  <input
                    type="text"
                    placeholder="Search a word.."
                    value={keyword}
                    onChange={(e) => onChangeForKeyword(e.target.value)}
                  />
                  <button>Search</button>
                </form>
                {alertStatus && (
                  <div className="searchAlert">Please type something..</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
