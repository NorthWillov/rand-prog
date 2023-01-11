import React, { useState, useEffect } from "react";
import programsDB from "./db";
import "./App.css";
import Programs from "./Programs";
import Jutro from "./Jutro";
import Required from "./Required";
import XmlForm from "./XmlForm";

function App() {
  const [progs, setProgs] = useState(programsDB);

  return (<>
    <Required color={"red"} title={"REQUIRED"} progs={progs} setProgs={setProgs} />

    <div className="programs">
      <Programs color={"salmon"} title={"PRO_WEEK"} progs={progs} setProgs={setProgs} />
      <Programs color={"forestgreen"} title={"PRO_Z23"} progs={progs} setProgs={setProgs} />
      <Programs color={"violet"} title={"PRO_LONG"} progs={progs} setProgs={setProgs} />
      <Programs color={"yellow"} title={"REG"} progs={progs} setProgs={setProgs} />
      <Programs color={"blue"} title={"DYL"} progs={progs} setProgs={setProgs} />
      <Programs color={"black"} title={"PRO_PO_WER"} progs={progs} setProgs={setProgs} />
      <Programs color={"brown"} title={"PRO_PO_HAS"} progs={progs} setProgs={setProgs} />
      <Programs color={"cornflowerblue"} title={"PRO_PO_LAF"} progs={progs} setProgs={setProgs} />
      <Programs color={"pink"} title={"UPOMNIKI"} progs={progs} setProgs={setProgs} />
      <Programs color={"orange"} title={"ID"} progs={progs} setProgs={setProgs} />
    </div>
    <div className="rest">
      <Jutro color={"lime"} title={"JUTRO"} progs={progs} setProgs={setProgs} />
      <XmlForm progs={progs} setProgs={setProgs} />
    </div>
  </>

  );
}

export default App;