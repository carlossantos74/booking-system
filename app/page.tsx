'use client'

import { 
  TableContainer, 
  Paper, 
  Table, 
  TableRow, 
  TableCell, 
  TableBody,
  Container,
  Box,
  useTheme,
  Button,
  Typography
} from "@mui/material";
import moment from 'moment';
import { TableMenu, TableHead } from "@/app/components/Table"
import { State } from "@/app/components/States";
import { useEffect, useState } from "react";
import { 
  fetchMeetingList, 
  deleteMeeting,
  useDispatch, 
  useSelector, 
  fetchRoomList
} from "@/lib/redux";
import { MeetingCreateForm } from "./components/FormMeeting";

export default function Page() {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [formOpen, setFormOpen] = useState(false);

  const meetingList = useSelector(state => state.meeting.meetingList);
  const isLoading = useSelector(state => state.meeting.isLoading);

  useEffect(() => { 
    dispatch(fetchMeetingList());
  }, []);

  const handleDeleteMeeting = (id: string) => {
    dispatch(deleteMeeting(id));
  }

  return (
    <Container maxWidth="xl">
      <MeetingCreateForm 
        open={formOpen} 
        onClose={setFormOpen} 
      /> 
      <Box 
        p={3} 
        my={3} 
        component={Paper} 
        bgcolor={theme.palette.grey[100]}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <h4>
          Meetings
        </h4>

        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Create meeting
        </Button>
      </Box>
      {
        !meetingList.length || isLoading ? (
          <State 
            state={isLoading ? 'loading' : 'empty'} 
            emptyText="No users to display"
          />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead 
                titles={['Name', 'Start', 'End', 'Room', 'Users', 'Actions']}
              />
              <TableBody>
                {
                  meetingList.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell>
                        {meeting.name}
                      </TableCell>
                      <TableCell>
                        {moment(meeting.timeToStart).format('YYYY-MM-DD HH:mm')} 
                      </TableCell>
                      <TableCell>
                        {moment(meeting.timeToEnd).format('YYYY-MM-DD HH:mm')}
                      </TableCell>
                      <TableCell>
                        {meeting.roomId || '-'}
                      </TableCell>
                      <TableCell>
                        {meeting.users.map((user, index) => (
                            <Typography key={user.id}>
                              {index + 1} - {user.name}
                            </Typography>
                          ))
                        }
                      </TableCell>
                      <TableCell>
                        <TableMenu 
                          onDelete={() => handleDeleteMeeting(meeting.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </Container>
  )
}