import { useDispatch } from "react-redux";
import { changeFilter } from "redux/reducer";
import { Input } from "antd";
import React from "react";

export const Search = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <p style={{ fontSize: "20px", marginTop: "48px" }}>Search</p>
      <Input
        name="search"
        placeholder="input search text"
        onChange={(e) => dispatch(changeFilter(e.target.value.trim()))}
        style={{ width: 200 }}
      />
    </div>
  );
};
