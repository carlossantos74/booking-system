'use client'

import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";

import { MenuItem } from './styles'

type TableMenuProps = {
  onDelete: () => void;
  onEdit?: () => void;
}

export const TableMenu = ({onDelete, onEdit}: TableMenuProps) => {
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
        <MenuItem onClick={onDelete}>
          <Delete /> 
          Delete  
        </MenuItem>
        {
          onEdit && (
            <MenuItem onClick={onEdit}>
              <Edit />
              Edit
            </MenuItem>
          )
        }
      </Menu>
    </>
  )
}