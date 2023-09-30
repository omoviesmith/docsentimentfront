import React from "react";
import { SimpleCard } from "../SimpleCard";

interface WordBlockProps {
  title: string;
  wordList: string[];
  color: string;
  backgroundColor: string;
}

export const WordBlock = ({
  title,
  wordList = [],
  color,
  backgroundColor,
}: WordBlockProps) => {
  return (
    <SimpleCard
      title={title}
      titleColor={color}
      backgroundColor={backgroundColor}
    >
      {wordList.length > 0 ? (
        <div
          style={{
            color: "#000",
            padding: "12px",
            position: "relative",
            flex: "1",
            overflow: "auto",
          }}
        >
          {wordList.map((word) => (
            <div>{word}</div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </SimpleCard>
  );
};
