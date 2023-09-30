import React from "react";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

import { useStore } from "../../stores/utils/useStore";

import styles from "./ScoreBar.module.css";

export const ScoreBar = observer(() => {
  const { score } = useStore();
  return (
    <div
      className={classNames(
        styles.container,
        score > 0 ? styles.success : styles.error
      )}
    >
      {`Net Positivity Store: ${score}`}
    </div>
  );
});
