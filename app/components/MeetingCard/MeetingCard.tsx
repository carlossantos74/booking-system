import { Meeting } from "@/app/api/meetings/types";
import { Box } from "./styles";
import { Avatar, Button, List, ListItem, Typography, useTheme } from "@mui/material";
import { People as PeopleIcon, Delete as DeleteIcon } from '@mui/icons-material';
import moment from "moment";

type MeetingCardProps = {
  meeting: Meeting
  onDelete: (meetingId: string) => void;
}

export function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h5" my={2}>{ meeting.name }</Typography>
      <Typography variant="body1">Start: {moment(meeting.timeToStart).format('YYYY-MM-DD HH:mm')} </Typography>
      <Typography variant="body1">End: {moment(meeting.timeToEnd).format('YYYY-MM-DD HH:mm')} </Typography>
      <Typography variant="body1">Room: { meeting.roomId || '-' }</Typography>
      <Typography 
        mt={2} 
        variant="h6" 
        color={theme.palette.grey[700]}
        display="flex"
        alignItems="center"
        gap="4px"
      >
        <PeopleIcon />
        Users
      </Typography>

      <List>
        { meeting.users.map((user) => (
            <ListItem key={user.id} sx={{ gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                { user.name.charAt(0) }
              </Avatar>
              { user.name }
            </ListItem>
          ))
        }
      </List>

      <Button 
        onClick={() => onDelete(meeting.id)}
        fullWidth 
        variant="contained"
        color="error"
        size="small"
      >
       <DeleteIcon /> Delete
      </Button>
    </Box>
  )
}