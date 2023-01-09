import React, { useEffect, useState } from "react";
import Program from "./Program";

function ProLong({ title, progs, setProgs, color }) {
  const [counter, setCounter] = useState(1);
  const [week, setWeek] = useState("monday");

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
  }, [progs]);

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

  const handleChange = (e) => {
    setWeek(e.target.value);
  };

  return (
    <div className="programs_block">
      <div className="custom-select">
        <select id="week" name="week" onChange={handleChange}>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </div>

      <div className="container">
        {progs[title]
          .filter((prog) => prog.week === week)
          .map((prog) => (
            <Program
              color={color}
              counter={counter}
              key={prog.id}
              prog={prog}
              handleClick={handleClick}
              handleCountMinus={handleCountMinus}
            />
          ))}
      </div>
    </div>
  );
}

export default ProLong;
