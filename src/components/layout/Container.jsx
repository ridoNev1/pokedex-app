import React from "react";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[85vw]">{children}</div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
