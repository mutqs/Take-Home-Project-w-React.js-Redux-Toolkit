import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { setResetFlag } from "../../redux/dataSlice";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const DateSelect = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [formattedFromDate, setFormattedFromDate] = useState("");
  const [formattedToDate, setFormattedToDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let query = useQuery();
  let tempQuery = query.get("q");

  const routeFilter = () => {
    if (formattedToDate === "") {
      setFormattedToDate(moment(new Date()).format("YYYY-MM-DD"));
    }
    dispatch(setResetFlag(false));
    navigate(
      `?&q=${tempQuery}&from=${formattedFromDate}&to=${formattedToDate}`,
      { replace: true }
    );
  };

  useEffect(() => {
    const fD = moment(fromDate).format("YYYY-MM-DD");
    setFormattedFromDate(fD);
  }, [fromDate]);

  useEffect(() => {
    const tD = moment(toDate).format("YYYY-MM-DD");
    setFormattedToDate(tD);
  }, [toDate]);

  useEffect(() => {
    setFromDate(new Date());
    setToDate(new Date());
  }, [tempQuery]);

  return (
    <div className="dateFilterWrapper">
      <span>Filter By Date..</span>
      <div className="filterArea">
        <div className="fromDate">
          <span>From..</span>
          <DatePicker
            selected={fromDate}
            onChange={(fromDate) => setFromDate(fromDate)}
          />
        </div>
        <div className="toDate">
          <span>To..</span>
          <DatePicker
            selected={toDate}
            onChange={(toDate) => setToDate(toDate)}
          />
        </div>
        <button onClick={() => routeFilter()} className="sendDate">
          Filter
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
