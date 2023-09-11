import { Grid as MuiGrid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Grid = styled(MuiGrid)(({ theme }) => ({
  padding: theme.spacing(1),
  background: theme.palette.grey[200],
  borderRadius: 4,
  minWidth: '350px',
  maxHeight: '100%',
  overflow: 'auto',
}));
