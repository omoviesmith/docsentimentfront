import React from "react";
import { observer } from "mobx-react-lite";

import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useStore } from "../../stores/utils/useStore";
import { StyledButton } from "../StyledButton";

export const SelectDocument = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { documentList, setDocumentId } = useStore();

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleSelectDocument(documentName: string) {
    console.log(documentName);

    const id = documentList.indexOf(documentName) + 1;
    console.log(id);

    setDocumentId(id);
  }

  return (
    <>
      <StyledButton
        color="inherit"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Select Document
      </StyledButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {documentList.map((label) => (
          <MenuItem key={label} onClick={() => handleSelectDocument(label)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
});
