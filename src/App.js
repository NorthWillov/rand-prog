import React, { useState, useEffect } from "react";
import programsDB from "./db";
import "./App.css";
import Programs from "./Programs";
import Jutro from "./Jutro";

function App() {
  const [progs, setProgs] = useState({
    PRO_WEEK: [],
    PRO_LONG: [],
    REG: [],
    DYL: [],
    PRO_PO: [],
  });

  useEffect(() => {
    setProgs(programsDB);
  }, []);

  return (
    <div>
      <Programs title={"PRO WEEK"} db={programsDB.PRO_WEEK} />
      <Programs title={"PRO LONG"} db={programsDB.PRO_LONG} />
      <Programs title={"REG"} db={programsDB.REG} />
      <Programs title={"DYL"} db={programsDB.DYL} />
      <Programs title={"PRO PO"} db={programsDB.PRO_PO} />
      <Jutro title={"JUTRO"} db={programsDB.JUTRO} />
    </div>
  );
}

export default App;
