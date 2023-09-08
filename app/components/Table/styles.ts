'use client'

import { 
  MenuItem as MuiMenuItem,
  TableHead as MuiTableHead
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
}))

export const TableHead = styled(MuiTableHead)(({theme}) => ({
  backgroundColor: theme.palette.grey[300],
}))