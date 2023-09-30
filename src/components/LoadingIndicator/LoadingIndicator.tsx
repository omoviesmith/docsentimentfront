import { FC } from "react";

import { LoadingImage } from "../../assets/LoadingImage";

import styles from "./LoadingIndicator.module.css";

interface LoadingIndicatorProps {
  fullWidth: boolean;
}

export const LoadingIndicator: FC<LoadingIndicatorProps> = ({ fullWidth }) => {
  return (
    <div
      className={styles.spinnerContainer}
      style={{
        position: fullWidth ? "absolute" : "relative",
        height: fullWidth ? "100%" : "200px",
      }}
    >
      <LoadingImage />
    </div>
  );
};
