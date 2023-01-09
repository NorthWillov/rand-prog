import React, { useState, useEffect } from "react";
import programsDB from "./db";
import "./App.css";
import Programs from "./Programs";
import Jutro from "./Jutro";
import Required from "./Required";
import XmlForm from "./XmlForm";

function App() {
  const [progs, setProgs] = useState(programsDB);

  return (
    <div>
      <Required title={"REQUIRED"} progs={progs} setProgs={setProgs} />
      <Programs title={"PRO_WEEK"} progs={progs} setProgs={setProgs} />
      <Programs title={"PRO_LONG"} progs={progs} setProgs={setProgs} />
      <Programs title={"REG"} progs={progs} setProgs={setProgs} />
      <Programs title={"DYL"} progs={progs} setProgs={setProgs} />
      <Programs title={"PRO_PO"} progs={progs} setProgs={setProgs} />
      <Jutro title={"JUTRO"} progs={progs} setProgs={setProgs} />
      <Programs title={"ID"} progs={progs} setProgs={setProgs} />
      <Programs title={"UPOMNIKI"} progs={progs} setProgs={setProgs} />
      <XmlForm progs={progs} setProgs={setProgs} />
    </div>
  );
}

export default App;
