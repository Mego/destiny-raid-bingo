import React from "react";

type Props = {
  text: string;
  finished: boolean;
  toggleFinished: () => void;
};

enum Colors {
  WHITE = "white",
  GREEN = "green",
}

const Square = ({ text, finished, toggleFinished }: Props) => {
  return (
    <div
      className="square"
      onClick={() => toggleFinished()}
      style={{
        backgroundColor: finished ? Colors.GREEN : Colors.WHITE,
      }}
    >
      <span
        style={{
          flex: 1,
          textAlign: "center",
          color: finished ? "white" : "black",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default Square;
