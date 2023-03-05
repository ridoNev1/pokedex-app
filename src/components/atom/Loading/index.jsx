import React from "react";
import "./style.css";
import PropType from "prop-types";

const Loading = ({ text }) => {
  return (
    <div className="flex w-full flex-col h-screen justify-center items-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>{text ? text : "Loading..."}</p>
    </div>
  );
};

Loading.propTypes = {
  text: PropType.string
};

export default Loading;
