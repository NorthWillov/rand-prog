import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";

function XmlForm({ progs, setProgs }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [filesCount, setFilesCount] = useState({});

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

      const counts = doc
        .getElementsByTagName("FileName")
        .map((prog) => prog.value.toUpperCase())
        .reduce(
          (acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1,
          }),
          {}
        );

      setFilesCount(counts);
      // set new programs

      let newDb = {};

      for (const category in progs) {
        newDb = {
          ...newDb,
          [category]: progs[category].map((prog) => ({
            ...prog,
            counter: counts[prog.program.toUpperCase()] || 0,
          })),
        };
      }
      setProgs(newDb);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="xmlPage">
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
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Counter</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filesCount)
              .sort()
              .map((prog) => (
                <tr key={prog[0]}>
                  <td>{prog[0]}</td>
                  <td>{prog[1]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default XmlForm;
