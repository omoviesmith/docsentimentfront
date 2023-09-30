import React from "react";
import { observer } from "mobx-react-lite";

import { CssBaseline, debounce } from "@mui/material";

import { MenuBar } from "./components/MenuBar";
import { ScoreBar } from "./components/ScoreBar";
import { Text } from "./components/Text";

import styles from "./App.module.css";
import MatxTheme from "./MatxTheme/MatxTheme";
import { WordBlock } from "./components/WorkBlock";
import { useStore } from "./stores/utils/useStore";
import {
  positiveColor,
  negativeColor,
  positiveBackgroundColor,
  negativeBackgroundColor,
} from "./constants/color";
import { withStore } from "./stores/utils/withStore";
import { LoadingIndicator } from "./components/LoadingIndicator/LoadingIndicator";
import { StyledButton } from "./components/StyledButton";
import { UploadDocument } from "./components/UploadDocument";
import { NotificationBar } from "./components/NotificationBar/NotificationBar";

const App = observer(() => {
  const { positiveWordList, negativeWordList, isLoading, analyze, clear } =
    useStore();

  return (
    <MatxTheme>
      <CssBaseline />
      <div className={styles.appContainer}>
        {isLoading && <LoadingIndicator fullWidth={true} />}
        <MenuBar />
        <div className={styles.subContainer}>
          <div className={styles.textContainer}>
            <div className={styles.actionContainer}>
              <StyledButton variant="contained" color="inherit">
                <UploadDocument />
              </StyledButton>
            </div>
            <Text />
            <div className={styles.actionContainer}>
              <StyledButton
                variant="contained"
                color="inherit"
                onClick={analyze}
                style={{ backgroundColor: positiveBackgroundColor }}
              >
                Analyze
              </StyledButton>
              <StyledButton variant="contained" color="inherit" onClick={clear}>
                Clear
              </StyledButton>
            </div>
          </div>

          <div className={styles.wordsBlockContainer}>
            <ScoreBar />
            <WordBlock
              title="Positive Words"
              wordList={positiveWordList}
              color={positiveColor}
              backgroundColor={positiveBackgroundColor}
            />
            <WordBlock
              title="Negative Words"
              wordList={negativeWordList}
              color={negativeColor}
              backgroundColor={negativeBackgroundColor}
            />
          </div>
        </div>
        <NotificationBar />
      </div>
    </MatxTheme>
  );
});

export default withStore(App);
