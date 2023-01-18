import React, { useState } from "react";
import XMLParser from "react-xml-parser";
import { DateTime } from "luxon";


function Gosia({ setIsGosia }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilesPicked, setIsFilesPicked] = useState(false);
  const [filesCount, setFilesCount] = useState({});
  const [inputVal, setInputVal] = useState("");


  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    setIsFilesPicked(true);
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
      reader.onloadend = function () {
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
      }
      reader.readAsText(selectedFile.item(i));
    }
  };

  const handleClose = () => {
    setIsGosia(false);
  };

  const handleChange = (e) => {
    setInputVal(e.target.value)
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={handleClose} className="close">
          &times;
        </span>
        <div className="xmlUploadForm_gosia">
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
        <input onChange={handleChange} value={inputVal} className="gosia_input" placeholder="Szukaj" />
        {Object.keys(filesCount).length !== 0 && inputVal.length > 1 && (
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
                .filter(prog => prog[0].includes(inputVal.toUpperCase()))
                .map((prog) => (
                  <tr key={prog[0]}>
                    <td>{prog[0]}</td>
                    <td>{prog[1].counter}</td>
                    <td>
                      {prog[1].time.sort().map(
                        (t) =>
                          <p key={t}>({DateTime.fromJSDate(new Date(t)).toFormat("f")})</p>
                      )}

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {Object.keys(filesCount).length !== 0 && inputVal.length <= 1 && (
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
                      {prog[1].time.sort().map(
                        (t) =>
                          <p key={t}>({DateTime.fromJSDate(new Date(t)).toFormat("f")})</p>
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
