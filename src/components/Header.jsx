import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { dischargeDatas, setResetFlag } from "../redux/dataSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const { pinnedNews } = useSelector((state) => state.data);

  let query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeForKeyword = (value) => {
    setKeyword(value);
  };

  const fillKeyword = () => {
    if (query?.get("q")) {
      setKeyword(query.get("q"));
    } else {
      setKeyword("");
    }
  };

  const routePins = () => {
    navigate(`/pins`, { replace: true });
  };

  const resetRoute = () => {
    navigate("/");
    fillKeyword();
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
  }, []);

  useEffect(() => {
    fillKeyword();
  }, [query]);

  return (
    <>
      <div className="headerWrapper">
        <div className="headerTop">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-8 col-md-3">
                <div onClick={() => resetRoute()} className="headerLeftWrapper">
                  <svg height="50" width="50" viewBox="0 0 512 512">
                    <path
                      fill="#e20404"
                      d="M168 80c-13.3 0-24 10.7-24 24V408c0 8.4-1.4 16.5-4.1 24H440c13.3 0 24-10.7 24-24V104c0-13.3-10.7-24-24-24H168zM72 480c-39.8 0-72-32.2-72-72V112C0 98.7 10.7 88 24 88s24 10.7 24 24V408c0 13.3 10.7 24 24 24s24-10.7 24-24V104c0-39.8 32.2-72 72-72H440c39.8 0 72 32.2 72 72V408c0 39.8-32.2 72-72 72H72zM176 136c0-13.3 10.7-24 24-24h96c13.3 0 24 10.7 24 24v80c0 13.3-10.7 24-24 24H200c-13.3 0-24-10.7-24-24V136zm200-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H376c-13.3 0-24-10.7-24-24s10.7-24 24-24zM200 272H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 80H408c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                    />
                  </svg>
                  <h3 className="headerInfo">Take-Home Project</h3>
                </div>
              </div>
              <div className="order-3 order-md-2 col col-md-5">
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
              <div className="order-2 order-md-3 col-4 col-md">
                <div className="rightAreaWrapper">
                  <div onClick={() => routePins()} className="pinArea">
                    <svg width="20px" height="20px" viewBox="0 0 384 512">
                      <path
                        fill="#e20404"
                        d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
                      />
                    </svg>
                    <div className="pinsCount">{pinnedNews.length}</div>
                  </div>
                  {/* <svg width="30px" height="30px" viewBox="0 0 448 512">
                    <path
                      fill="#e20404"
                      d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                  </svg> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
