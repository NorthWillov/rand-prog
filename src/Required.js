import React, { useEffect, useState } from "react";
import Program from "./Program";

function Required({ title, progs, setProgs, color }) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let isUp = true;

    progs[title].forEach((prog) => {
      if (prog.counter < counter) {
        isUp = false;
      }
      if (prog.counter > counter) {
        setCounter(counter + 1);
      }
    });

    if (isUp) {
      setCounter(counter + 1);
    }

    if (progs[title].every((prog) => prog.counter < counter)) {
      setCounter(counter - 1);
    }
  }, [progs[title]]);

  const handleClick = (prog) => {
    setProgs({
      ...progs,
      [title]: [
        ...progs[title].filter((p) => p.id !== prog.id),
        { ...prog, counter: prog.counter + 1 },
      ].sort((a, b) => a.id - b.id),
    });

    navigator.clipboard.writeText(prog.program);
  };

  const handleCountMinus = (prog) => {
    setProgs({
      ...progs,
      [title]: [
        ...progs[title].filter((p) => p.id !== prog.id),
        { ...prog, counter: prog.counter - 1 },
      ].sort((a, b) => a.id - b.id),
    });
  };

  return (
    <div className="programs_block_required">
      <div className="container">
        {progs[title].map((prog) => {
          return (
            <Program
            color={color}
              counter={counter}
              key={prog.id}
              prog={prog}
              handleClick={handleClick}
              handleCountMinus={handleCountMinus}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Required;
