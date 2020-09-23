import { MersenneTwister19937, string } from "random-js";
import React, { useState } from "react";
import { Board } from "./components";
import raids from "./squares.json";
import "./App.css";

const App = () => {
  const [seed, setSeed] = useState<string>("");
  const [raid, setRaid] = useState<keyof typeof raids | "null">("null");
  const [renderBoard, setRenderBoard] = useState<boolean>(false);

  let boardSeed = Array.from(seed)
    .map((c) => c.charCodeAt(0).toString(16).toUpperCase())
    .join("");
  boardSeed = `${boardSeed}${
    boardSeed.length % 4 !== 0 ? "00".repeat(4 - (boardSeed.length % 4)) : ""
  }`;

  return (
    <div
      className="app"
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "space-evenly",
        }}
      >
        <input
          onChange={(e) => setSeed(e.target.value)}
          placeholder="Enter seed (or leave blank for random)"
          value={seed}
          style={{ width: "32rem" }}
        />
        <select
          id="raid-select"
          value={raid}
          onChange={(e) => setRaid(e.target.value as keyof typeof raids)}
        >
          <option value="null">Select Raid</option>
          {Object.keys(raids).map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (raid !== "null") {
              if (!seed) {
                const mt = MersenneTwister19937.autoSeed();
                setSeed(string("1234567890ABCDEF")(mt, 32));
              }
              setRenderBoard(true);
            }
          }}
        >
          Generate
        </button>
      </div>
      {renderBoard && raid !== "null" && (
        <div>
          <Board seed={boardSeed} squares={raids[raid]} />
        </div>
      )}
    </div>
  );
};

export default App;
