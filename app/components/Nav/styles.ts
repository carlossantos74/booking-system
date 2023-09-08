'use client'

import { Link as MuiLink, Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Link = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer'
}))

export const Box = styled(MuiBox)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))