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
  let shuffledSquares: string[];

  if (seed) {
    const seedArray = new Int8Array(hexToBytes(seed));
    const mt = MersenneTwister19937.seedWithArray(
      new Int32Array(seedArray.buffer)
    );
    shuffledSquares = shuffle(mt, squares.slice(1)); // first element is free space and should always be in the middle
    shuffledSquares = [
      ...shuffledSquares.slice(0, 12),
      squares[0],
      ...shuffledSquares.slice(12),
    ];
  } else {
    shuffledSquares = squares;
  }

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
    <table className="bingo">
      {range(5).map((row) => (
        <tr>
          {range(5).map((col) => {
            const id = row * 5 + col;
            return (
              <Square
                text={shuffledSquares[id]}
                finished={finished.has(id)}
                toggleFinished={toggleFinishedMaker(id)}
                key={id}
              />
            );
          })}
        </tr>
      ))}
    </table>
  );
};

export default Board;
