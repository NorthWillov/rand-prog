import React, { useEffect, useState } from "react";
import Program from "./Program";

function ProLong({ db }) {
  const [progs, setProgs] = useState(db);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let isUp = true;

    progs.forEach((prog) => {
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

    if (progs.every((prog) => prog.counter < counter)) {
      setCounter(counter - 1);
    }
  }, [progs]);

  const handleClick = (prog) => {
    setProgs(
      [
        ...progs.filter((p) => p.id !== prog.id),
        { ...prog, counter: prog.counter + 1 },
      ].sort((a, b) => a.id - b.id)
    );

    navigator.clipboard.writeText(prog.program);
  };
  const handleCountMinus = (prog) => {
    setProgs(
      [
        ...progs.filter((p) => p.id !== prog.id),
        { ...prog, counter: prog.counter - 1 },
      ].sort((a, b) => a.id - b.id)
    );
  };

  return (
    <div className="programs_block">
      <div className="container">
        {progs.map((prog) => {
          return (
            <Program
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

export default ProLong;
