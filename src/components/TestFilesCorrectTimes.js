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
        "09:30",
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
    ADV_W23_HILSONG: {
      times: [
        "10:00",
        "12:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "20:00",
        "22:00",
        "23:59",
      ],
      delay: 360,
    },
    ADV_W23_MAJ_SZARON: {
      times: ["19:00"],
      delay: 60,
    },
  };

  const targetKeys = [
    "ADV_W23_IGLAK",
    "ADV_IGLAK_KW22_1",
    "ADV_W23_HILSONG",
    "ADV_W23_MAJ_SZARON",
  ];
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
              `Не вписаний ${targetKey} о такій годині ${DateTime.fromJSDate(
                properTime
              ).toLocaleString(DateTime.TIME_24_SIMPLE)}`
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
              `"${targetKey}" не знаходиться у правильному проміжку часу. Має бути у проміжку +-${
                filesInProperTime[targetKey].delay
              } хвилин! Час який вписаний - ${DateTime.fromJSDate(
                actualTime
              ).toLocaleString(
                DateTime.TIME_24_SIMPLE
              )}, а має бути у проміжку біля години ${DateTime.fromJSDate(
                properTime
              ).toLocaleString(DateTime.TIME_24_SIMPLE)}`
            );
          }
        }
      } else {
        messArr.push(`'${targetKey}' Не вписаний у плейлист`);
      }
    }
    setMessages(messArr);
  }, [filesCount]);

  return (
    <div>
      {messages.length > 0 ? (
        <h1
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "50px",
            margin: "50px 0 10px",
          }}
        >
          FAIL
        </h1>
      ) : (
        <h1
          style={{
            color: "green",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "50px",
            margin: "50px 0 10px",
          }}
        >
          SUCCESS
        </h1>
      )}

      {messages.length > 0 && (
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
      )}

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
            {messages.some((str) => str.includes(file)) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
                  x1="9.858"
                  x2="38.142"
                  y1="9.858"
                  y2="38.142"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#f44f5a"></stop>
                  <stop offset=".443" stopColor="#ee3d4a"></stop>
                  <stop offset="1" stopColor="#e52030"></stop>
                </linearGradient>
                <path
                  fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
                  d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                ></path>
                <path
                  d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
                  opacity=".05"
                ></path>
                <path
                  d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
                  opacity=".07"
                ></path>
                <path
                  fill="#fff"
                  d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
                ></path>
                <path
                  fill="#fff"
                  d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
                ></path>
              </svg>
            ) : (
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
            )}
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
