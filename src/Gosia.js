import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import { DateTime } from "luxon";

function Gosia({ progs, setProgs, setIsGosia }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [filesCount, setFilesCount] = useState({});

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    let progArr = [];

    for (let i = 0; i < selectedFile.length; i++) {
      var readXml = null;
      var reader = new FileReader();
      reader.onload = function (e) {
        readXml = e.target.result;
        var doc = new XMLParser().parseFromString(readXml);

        const counts = doc.getElementsByTagName("Event").map((prog) => {
          return {
            title: prog.children[1].value.toUpperCase(),
            time: prog.children[2].value,
          };
        });
        progArr = [...progArr, ...counts];
      };
      reader.readAsText(selectedFile.item(i));
    }
    setTimeout(() => {
      const multiCounts = progArr.reduce(
        (acc, value) => ({
          ...acc,
          [value.title]: {
            counter: (acc[value.title]?.counter || 0) + 1,
            time: [...(acc[value.title]?.time || ""), value.time],
          },
        }),
        {}
      );

      setFilesCount(multiCounts);
    }, 1000);
  };

  const handleClose = () => {
    setIsGosia(false);
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={handleClose} className="close">
          &times;
        </span>
        <div className="xmlUploadForm">
          <input
            className="custom-file-upload"
            type="file"
            name="file"
            multiple
            onChange={changeHandler}
          />
          <button className="xmlUploadBtn" onClick={handleSubmission}>
            Submit
          </button>
        </div>
        <input />
        {Object.keys(filesCount).length !== 0 && (
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
                      {prog[1].time.map(
                        (t) =>
                          `(${DateTime.fromJSDate(new Date(t)).toFormat("f")}) `
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Gosia;
