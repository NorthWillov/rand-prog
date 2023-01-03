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
      <Programs db={programsDB.PRO_WEEK} />
      <Programs db={programsDB.PRO_LONG} />
      <Programs db={programsDB.REG} />
      <Programs db={programsDB.DYL} />
      <Programs db={programsDB.PRO_PO} />
      <Jutro db={programsDB.JUTRO} />
      <Programs db={programsDB.UPOMNIKI} />
      <Programs db={programsDB.ID} />
    </div>
  );
}

export default App;
