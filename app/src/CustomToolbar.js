import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";

const CustomToolbar = ({ handleOpenModal, handleSetProduct }) => {
  
  const handleClick = () => {
    console.log("clicked on icon!");
    handleSetProduct({});
    handleOpenModal();
  }

  return (
    <React.Fragment>
      <Tooltip title={"Add Product"}>
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default CustomToolbar;