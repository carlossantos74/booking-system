'use client'

import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Box = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 4,
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
