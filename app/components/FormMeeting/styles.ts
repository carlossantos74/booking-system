'use client'

import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
  width: '100%',
}));
