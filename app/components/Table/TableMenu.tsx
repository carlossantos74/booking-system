'use client'

import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";

import { MenuItem } from './styles'

export const TableMenu = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => { 
    setAnchorElement(event.currentTarget);
  }

  const handleClose = () => { 
    setAnchorElement(null);
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu 
        open={!!anchorElement} 
        anchorEl={anchorElement}
        onClose={handleClose}
        >
        <MenuItem>
          <Delete /> 
          Delete  
        </MenuItem>
        <MenuItem>
          <Edit />
          Edit
        </MenuItem>
      </Menu>
    </>
  )
}