import React, { useState } from "react";
import programsDB from "./db";
import "./App.css";
import Programs from "./Programs";
import Jutro from "./Jutro";
import Required from "./Required";
import XmlForm from "./XmlForm";
import Gosia from "./Gosia";

function App() {
  const [progs, setProgs] = useState(programsDB);
  const [isGosia, setIsGosia] = useState(false);

  const handleGosia = () => {
    setIsGosia(!isGosia);
  };

  return (
    <>
      <Required
        color={"red"}
        title={"REQUIRED"}
        progs={progs}
        setProgs={setProgs}
      />

      <div className="programs">
        <Programs
          color={"salmon"}
          title={"PRO_WEEK"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"forestgreen"}
          title={"PRO_Z23"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"violet"}
          title={"PRO_LONG"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"black"}
          title={"PRO_PO_WER"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"brown"}
          title={"PRO_PO_HAS"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"cornflowerblue"}
          title={"PRO_PO_LAF"}
          progs={progs}
          setProgs={setProgs}
        />
        <Programs
          color={"orange"}
          title={"ID"}
          progs={progs}
          setProgs={setProgs}
        />
      </div>
      <div className="rest">
        <Jutro
          color={"lime"}
          title={"JUTRO"}
          progs={progs}
          setProgs={setProgs}
        />
        <XmlForm progs={progs} setProgs={setProgs} />
        <button onClick={handleGosia} className="glow" type="button">
          Tryb Gosia
        </button>
        {isGosia && <Gosia setIsGosia={setIsGosia} />}
      </div>
    </>
  );
}

export default App;
