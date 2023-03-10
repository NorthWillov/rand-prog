import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import PieRechart from "./components/PieRechart";
import { DateTime } from "luxon";

function XmlForm({ progs, setProgs }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [filesCount, setFilesCount] = useState({});
  const [warnings, setWarnings] = useState([]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    var readXml = null;
    var reader = new FileReader();
    reader.onload = function (e) {
      readXml = e.target.result;
      var doc = new XMLParser().parseFromString(readXml);
      const newWarnings = [];

      const startTimesArr = doc.getElementsByTagName("StartTime");

      const counts = doc
        .getElementsByTagName("Event")
        .map((prog, idx) => {
          // Check if "Event Exit" is not equals to 0 and display a warning about it
          if (Number(prog.children[18].value) !== 0) {
            newWarnings.push({
              title: prog.children[1].value,
              time: DateTime.fromJSDate(
                new Date(prog.children[2].value)
              ).toLocaleString(DateTime.TIME_24_SIMPLE),
            });
          }
          // Calculating miliseconds from files
          const ms =
            new Date(startTimesArr[idx + 1]?.value).getTime() -
              new Date(prog.children[2].value).getTime() || 4000;

          return {
            title: prog.children[1].value.toUpperCase(),
            time: prog.children[2].value,
            category: prog.children[28].value,
            duration: ms,
          };
        })
        .reduce(
          (acc, value) => ({
            ...acc,
            [value.title]: {
              counter: (acc[value.title]?.counter || 0) + 1,
              time: [...(acc[value.title]?.time || ""), value.time],
              category: value.category,
              duration: value.duration,
            },
          }),
          {}
        );
      setWarnings(newWarnings);
      setFilesCount(counts);

      // recalculate counters after playlist submit
      let newDb = {};
      for (const category in progs) {
        newDb = {
          ...newDb,
          [category]: progs[category].map((prog) => ({
            ...prog,
            counter: counts[prog.program.toUpperCase()]?.counter || 0,
          })),
        };
      }
      setProgs(newDb);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="xmlPage">
      {warnings.length !== 0 && (
        <div>
          <ul>
            {warnings.map((warning) => (
              <li key={warning.time} className="warning">
                WARNING: NA PROGRAM <b>"{warning.title}"</b> O GODZINIE{" "}
                <b>"{warning.time}"</b> JEST USTAWIONY EXIT MANUAL
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="xmlUploadForm">
        <input
          className="custom-file-upload"
          type="file"
          name="file"
          onChange={changeHandler}
        />
        <button className="xmlUploadBtn" onClick={handleSubmission}>
          Submit
        </button>
      </div>
      {Object.keys(filesCount).length !== 0 && (
        <>
          <PieRechart files={filesCount} />
          <table>
            <thead>
              <tr>
                <th>Program</th>
                <th>Counter</th>
                <th>Times</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(filesCount)
                .sort()
                .map((prog) => (
                  <tr key={prog[0]}>
                    <td>{prog[0]}</td>
                    <td>{prog[1].counter}</td>
                    <td>
                      {prog[1].time
                        .map((t) =>
                          DateTime.fromJSDate(new Date(t)).toLocaleString(
                            DateTime.TIME_24_SIMPLE
                          )
                        )
                        .join(", ")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default XmlForm;
