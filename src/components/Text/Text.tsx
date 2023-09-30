import { observer } from "mobx-react-lite";

import { useStore } from "../../stores/utils/useStore";
import { negativeColor, positiveColor } from "../../constants/color";
import { SimpleCard } from "../SimpleCard";

import styles from "./Text.module.css";

export const HighlightKeywords = ({
  text,
  positiveWordList,
  negativeWordList,
}: {
  text: string;
  positiveWordList: string[];
  negativeWordList: string[];
}) => {
  return (
    <>
      {text?.split("\n").map((line, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap" }}>
          {line.split(" ").map((word, index) => {
            const isPositive = positiveWordList.includes(word.toLowerCase());
            const isNegative = negativeWordList.includes(word.toLowerCase());
            return (
              <span
                key={index}
                style={{
                  fontSize: "16px",
                  height: "22px",
                  color: isPositive
                    ? positiveColor
                    : isNegative
                    ? negativeColor
                    : "#000",
                }}
              >
                {word}&nbsp;
              </span>
            );
          })}
        </div>
      ))}
    </>
  );
};

export const TextContent = observer(() => {
  const { text, positiveWordList, negativeWordList } = useStore();

  return (
    <div className={styles.textContent}>
      <div className={styles.text}>
        {/* <PDFComponent
          text={text}
          positiveWordList={positiveWordList}
          negativeWordList={negativeWordList}
        /> */}
        <HighlightKeywords
          text={text}
          positiveWordList={positiveWordList}
          negativeWordList={negativeWordList}
        />
      </div>
    </div>
  );
});

export const Text = observer(() => {
  return (
    <div className={styles.container}>
      <SimpleCard>
        <TextContent />
      </SimpleCard>
    </div>
  );
});
