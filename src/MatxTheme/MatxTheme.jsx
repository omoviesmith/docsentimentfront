import { CssBaseline, ThemeProvider } from "@mui/material";

import { themes } from "./initThemes";

const MatxTheme = ({ children }) => {
  console.log(themes);
  return (
    <ThemeProvider theme={themes.blue}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
