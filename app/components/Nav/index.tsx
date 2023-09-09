import { Person, Groups, CalendarMonth } from '@mui/icons-material';
import { Link, Box } from './styles';


export function Nav() { 
  return (
    <Box component="nav">
      <Link href='/users'><Person /> Users</Link>
      <Link href='/rooms'><Groups /> Rooms</Link>
      <Link href='/'><CalendarMonth /> Calendar</Link>
    </Box>
  )
}