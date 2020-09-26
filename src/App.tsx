import { MersenneTwister19937, string } from "random-js";
import React, { useState } from "react";
import { Board } from "./components";
import raids from "./squares";
import "./App.css";

raids["null"] = [...Array(25).keys()].map(() => "");

const App = () => {
  const [seed, setSeed] = useState<string>("");
  const [raid, setRaid] = useState<keyof typeof raids | "null">("null");
  let boardSeed = "";
  if (seed) {
    boardSeed = Array.from(seed)
      .map((c) => c.charCodeAt(0).toString(16).toUpperCase())
      .join("");
    boardSeed = `${boardSeed}${
      boardSeed.length % 8 !== 0 ? "0".repeat(8 - (boardSeed.length % 8)) : ""
    }`;
  }

  const [boardProps, setBoardProps] = useState<
    React.ComponentProps<typeof Board>
  >({
    squares: raids[raid],
    seed: boardSeed,
  });

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
          {Object.keys(raids)
            .filter((name) => name !== "null")
            .map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
        </select>
        <button
          onClick={() => {
            if (raid !== "null") {
              let newSeed = seed;
              if (!seed) {
                const mt = MersenneTwister19937.autoSeed();
                newSeed = string("1234567890ABCDEF")(mt, 32);
                setSeed(newSeed);
              }
              setBoardProps({ squares: raids[raid], seed: newSeed });
            }
          }}
        >
          Generate
        </button>
      </div>
      <div>
        <Board {...boardProps} />
      </div>
    </div>
  );
};

export default App;
