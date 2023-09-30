import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material";
import { Autocomplete } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";

import { useStore } from "../../stores/utils/useStore";

const RadioRoot = styled("div")(({ theme }) => ({
  display: "flex",
  "& .formControl": {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  "& .group": { margin: theme.spacing(1, 0) },
}));

type Option = "positive" | "negative";

export function ReplaceDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [wordsOption, setWordsOption] = React.useState<Option>("positive");
  const [oldWord, setOldWord] = React.useState<string | null>(null);
  const [newWord, setNewWord] = React.useState<string>("");

  const { positiveWordList, negativeWordList, replace } = useStore();

  const handleReplace = () => {
    replace(oldWord ?? "", newWord, false);
  };
  const handleReplaceAll = () => {
    replace(oldWord ?? "", newWord, true);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Find and Replace</DialogTitle>

      <DialogContent>
        <RadioRoot>
          <FormControl component="fieldset" className="formControl">
            <RadioGroup
              value={wordsOption}
              name="option"
              className="group"
              aria-label="Option"
              onChange={(_, value) => {
                setWordsOption(value as Option);
                setOldWord(null);
              }}
            >
              <FormControlLabel
                value="positive"
                control={<Radio />}
                label="Positive Words"
              />
              <FormControlLabel
                value="negative"
                control={<Radio />}
                label="Negative Words"
              />
            </RadioGroup>
          </FormControl>
        </RadioRoot>
        <Autocomplete
          options={
            wordsOption === "positive" ? positiveWordList : negativeWordList
          }
          onChange={(_, value) => setOldWord(value ?? "")}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find What:"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <TextField
          fullWidth
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          id="newWord"
          type="text"
          margin="dense"
          label="Replace With:"
        />
      </DialogContent>

      <DialogActions style={{ padding: "0 24px 20px" }}>
        <Button variant="outlined" color="secondary" onClick={handleReplace}>
          Replace
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReplaceAll}>
          Replace All
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
