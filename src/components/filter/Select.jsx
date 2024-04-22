import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  filterNews,
  setFullFilteredNews,
  setResetFlag,
} from "../../redux/dataSlice";

const Select = () => {
  const location = useLocation();
  const [resetOption, setResetOption] = useState("");
  const dispatch = useDispatch();
  const { sources, resetFlag } = useSelector((state) => state.data);

  const onChangeHandler = (e) => {
    dispatch(filterNews(e.target.value));
    dispatch(setResetFlag(true));
    setResetOption(e.target.value);
  };

  const handleFlag = () => {
    dispatch(setFullFilteredNews());
    dispatch(setResetFlag(false));
    setResetOption("Choose..");
  };

  useEffect(() => {
    setResetOption("Choose..");
  }, [location]);

  return (
    <div className="selectArea">
      <span>Filter by Source..</span>
      <select
        onChange={(e) => onChangeHandler(e)}
        value={resetOption}
        name="filter"
        id="filter"
      >
        <option value="default">Choose..</option>
        {sources &&
          sources.map((source, index) => <option key={index}>{source}</option>)}
      </select>
      {resetFlag && (
        <div onClick={handleFlag} className="resetFilter">
          <svg height="15px" width="15px" viewBox="0 0 384 512">
            <path
              fill="#e20404"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Select;
