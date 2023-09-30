import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useStore } from "../../stores/utils/useStore";

import { ReplaceDialog } from "../ReplaceDialog";
import { UploadDocument } from "../UploadDocument";
import { UploadDictionary } from "../UploadDictionary/UploadDictionary";
import { handleExportPDF } from "../PdfComponents/PdfComponents";

import styles from "./MenuBar.module.css";
import { SelectDocument } from "../SelectDocument";

const FileMenu = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { clear, text, positiveWordList, negativeWordList } = useStore();

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleClear = () => {
    clear();
    handleClose();
  };

  return (
    <Box>
      <Button
        color="inherit"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ width: "18px" }}
      >
        File
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem key="Upload Document" onClick={handleClose}>
          <UploadDocument onClose={handleClose} />
        </MenuItem>
        <MenuItem
          key="Upload Dictionary"
          onClick={() => document.getElementById("uploadDictionary")?.click()}
        >
          <UploadDictionary onClose={handleClose} />
        </MenuItem>
        <MenuItem
          key="Export"
          onClick={() => {
            handleExportPDF(text, positiveWordList, negativeWordList);
            handleClose();
          }}
        >
          <label htmlFor="Export">Export</label>
        </MenuItem>
        <MenuItem key="Clear" onClick={handleClear}>
          <label htmlFor="Clear">Clear</label>
        </MenuItem>
      </Menu>
    </Box>
  );
});

function EditMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => setOpenDialog(false);

  function handleClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  return (
    <Box>
      <Button
        color="inherit"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ width: "80px" }}
      >
        Edit
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem key="Replace" onClick={handleClickOpenDialog}>
          <label htmlFor="Replace">Find and Replace</label>
        </MenuItem>
      </Menu>
      {openDialog && (
        <ReplaceDialog open={openDialog} onClose={handleCloseDialog} />
      )}
    </Box>
  );
}

export const MenuBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div>Document Sentiment Analysis</div>
        <FileMenu />
        <EditMenu />
      </div>
      <div style={{ width: "200px" }}>
        <SelectDocument />
      </div>
    </div>
  );
};
