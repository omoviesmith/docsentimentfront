import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";

function SimpleMenu({ label, subMenuList }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Box>
      <Button
        variant="outlined"
        aria-haspopup="true"
        onClick={handleClick}
        aria-owns={anchorEl ? "simple-menu" : undefined}
      >
        {label}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {subMenuList.map(({ label, handleAction }) => (
          <MenuItem key={label} onClick={handleAction}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default SimpleMenu;
