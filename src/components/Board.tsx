import React, { useState } from "react";
import { MersenneTwister19937, shuffle } from "random-js";
import Square from "./Square";

const hexToBytes = (s: string) => {
  const bytes = [];
  for (let i = 0; i < s.length; i += 2) {
    bytes.push(parseInt(s.substr(i, 2), 16));
  }
  return bytes;
};

const range = (max: number) => [...new Array(max).keys()];

type Props = {
  seed: string;
  squares: string[];
};

const Board = ({ seed, squares }: Props) => {
  const seedArray = new Int8Array(hexToBytes(seed));
  const mt = MersenneTwister19937.seedWithArray(
    new Int32Array(seedArray.buffer)
  );
  let shuffledSquares = shuffle(mt, squares.slice(1)); // first element is free space and should always be in the middle
  shuffledSquares = [
    ...shuffledSquares.slice(0, 12),
    squares[0],
    ...shuffledSquares.slice(12),
  ];

  const [finished, setFinished] = useState<Set<number>>(new Set<number>());

  const toggleFinishedMaker = (id: number) => () => {
    const newFinished = new Set<number>(finished.values());
    if (newFinished.has(id)) {
      newFinished.delete(id);
    } else {
      newFinished.add(id);
    }
    setFinished(newFinished);
  };

  return (
    <div className="grid" style={{ flex: 1 }}>
      {range(25).map((id) => (
        <Square
          text={shuffledSquares[id]}
          finished={finished.has(id)}
          toggleFinished={toggleFinishedMaker(id)}
          key={id}
        />
      ))}
    </div>
  );
};

export default Board;
