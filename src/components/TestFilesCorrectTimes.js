import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const TestFilesCorrectTimes = React.memo(({ filesCount }) => {
  const [messages, setMessages] = useState([]);

  const filesInProperTime = {
    ADV_W23_IGLAK: {
      times: ["09:00", "13:00", "15:00", "19:30", "22:30"],
      delay: 5,
    },
    ADV_IGLAK_KW22_1: {
      times: [
        "9:30",
        "10:30",
        "12:00",
        "13:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
      ],
      delay: 5,
    },
    ADV_W23_hilsong: {
      times: ["12:00", "14:00", "16:00", "18:00"],
      delay: 5,
    },
  };

  const targetKeys = ["ADV_W23_IGLAK", "ADV_IGLAK_KW22_1", "ADV_W23_hilsong"];
  const messArr = [];

  useEffect(() => {
    for (let i = 0; i < targetKeys.length; i++) {
      const targetKey = targetKeys[i];

      if (
        filesInProperTime.hasOwnProperty(targetKey) &&
        filesCount.hasOwnProperty(targetKey)
      ) {
        const properTimes = filesInProperTime[targetKey].times;
        const actualTimes = filesCount[targetKey].time;

        // if (properTimes.length !== actualTimes.length) {
        //   messArr.push(
        //     `There is a missing file for ${targetKey} on the playlist that should be placed, MUST BE AROUND ${properTimes} BUT INSTEAD GOT ${actualTimes.map(t => t.substr(11, 5))}`
        //   );
        //   console.log("ERROR");
        //   continue;
        // }

        for (let j = 0; j < properTimes.length; j++) {
          const properTime = new Date(`2000-01-01T${properTimes[j]}`);

          if (!actualTimes[j]) {
            messArr.push(
              `MISSING FILE ${targetKey} ON ${DateTime.fromJSDate(
                properTime
              ).toLocaleString(DateTime.TIME_24_SIMPLE)} SPAN`
            );
            continue;
          }
          const actualTime = new Date(
            `2000-01-01T${actualTimes[j].substr(11, 5)}`
          );

          const timeDiff = Math.abs(properTime - actualTime);
          const timeDiffInMinutes = timeDiff / (1000 * 60); // Convert milliseconds to minutes

          if (timeDiffInMinutes <= filesInProperTime[targetKey].delay) {
            console.log(`"${targetKey}" is within the correct time range.`);
          } else {
            messArr.push(
              `"${targetKey}" is NOT within the correct time range. Actual time has to be within ${
                filesInProperTime[targetKey].delay
              } minutes time span! The time is ${DateTime.fromJSDate(
                actualTime
              ).toLocaleString(
                DateTime.TIME_24_SIMPLE
              )}, and has to be placed within this time ${DateTime.fromJSDate(
                properTime
              ).toLocaleString(DateTime.TIME_24_SIMPLE)}`
            );
          }
        }
      } else {
        messArr.push(`"${targetKey}" does not exist on the playlist.`);
      }
    }
    setMessages(messArr);
  }, [filesCount]);

  if (messages.length > 0) {
    return (
      <div>
        <h1
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "50px",
            margin: "50px 0 10px",
          }}
        >
          TEST FAILED
        </h1>
        <ul
          style={{
            margin: "0 auto",
            textAlign: "center",
            listStyle: "none",
            marginBottom: "50px",
          }}
        >
          <h4>Mistakes are:</h4>
          {messages.map((mist, idx) => (
            <li key={idx}>{mist}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{
          color: "green",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "50px",
          margin: "50px 0 10px",
        }}
      >
        TEST PASSED
      </h1>
      <h4 style={{ textAlign: "center" }}>Files checked:</h4>
      <ul
        style={{
          margin: "0 auto",
          textAlign: "center",
          listStyle: "none",
          marginBottom: "50px",
        }}
      >
        {Object.keys(filesInProperTime).map((file) => (
          <li key={file}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4caf50"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              ></path>
              <path
                fill="#ccff90"
                d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
              ></path>
            </svg>
            <b>{file}</b> (with +-{filesInProperTime[file].delay} minutes span):{" "}
            {filesInProperTime[file].times.map((time) => (
              <p
                style={{ display: "inline-block", fontStyle: "italic" }}
                key={time}
              >
                {time}
                {","}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TestFilesCorrectTimes;
