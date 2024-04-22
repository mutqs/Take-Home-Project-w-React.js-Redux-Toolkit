import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BASE_URL_1_1,
  BASE_URL_2,
  fetchFilteredNews,
  dischargeCustomNews,
} from "../../redux/dataSlice";

const Flow = () => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const sourceArr = [
    { source: "NewsApi", id: 1 },
    { source: "NY Times", id: 2 },
  ];

  const categoryArr = ["Sports", "Technology", "Science"];

  const onChangeHandler1 = (e) => {
    sourceArr.forEach((x) => {
      if (x?.source === e.target.value) {
        return setIndex(x.id);
      }
    });
    setFirstValue(e.target.value);
  };
  const onChangeHandler2 = (e) => {
    setSecondValue(e.target.value);
  };

  const switchFunc = () => {
    console.log("index", index);
    let base1;
    let base2;
    if (firstValue && secondValue) {
      if (index === 1) {
        base1 = BASE_URL_1_1 + `&category=${secondValue}`;
        dispatch(dischargeCustomNews());
        dispatch(
          fetchFilteredNews({ url: base1, source: "newsApi", index: 3 })
        );
      } else if (index === 2) {
        base2 = BASE_URL_2 + `&fq=${secondValue}`;
        dispatch(dischargeCustomNews());
        dispatch(
          fetchFilteredNews({ url: base2, source: "nyTimes", index: 4 })
        );
      }
    }
  };

  useEffect(() => {
    switchFunc();
  }, [firstValue, secondValue]);

  return (
    <div className="flowWrapper">
      <div className="customFilterArea">
        <div className="firstSelect">
          <select
            name="filter"
            id="filter"
            onChange={(e) => onChangeHandler1(e)}
            value={firstValue}
          >
            <option value="default">Sources..</option>
            {sourceArr &&
              sourceArr.map((sourceItem, index) => (
                <option key={index}>{sourceItem?.source}</option>
              ))}
          </select>
        </div>
        <div className="secondSelect">
          <select
            onChange={(e) => onChangeHandler2(e)}
            value={secondValue}
            name="filter"
            id="filter"
          >
            <option value="default">Categories..</option>
            {categoryArr &&
              categoryArr.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Flow;
