import React from "react";

const Program = ({ prog, handleClick, handleCountMinus, counter }) => {
  return (
    <div className={"greenBg program"}>
      <p>{prog.duration}</p>
      <h2>{prog.program}</h2>
      <div className="funcs">
        <button className="copy" onClick={() => handleClick(prog)}>
          COPY
        </button>{" "}
        <span>
          <b>{prog.counter}</b>
        </span>{" "}
        <button className="minus" onClick={() => handleCountMinus(prog)}>
          -
        </button>
      </div>
    </div>
  );
};

export default Program;
