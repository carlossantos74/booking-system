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
  TextField,
} from "@mui/material";
import { Room } from '@prisma/client';
import moment from 'moment';
import { TableMenu, TableHead } from "@/app/components/Table";
import { FormDialog } from "@/app/components/FormDialog";
import { State } from "@/app/components/States";
import { useEffect, useState } from "react";
import { 
  fetchRoomList, 
  createRoom, 
  deleteRoom, 
  editRoom, 
  useDispatch, 
  useSelector 
} from "@/lib/redux";

export default function Page() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [roomName, setRoomName] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);

  useEffect(() => { 
    dispatch(fetchRoomList());
  }, [])


  const roomList = useSelector(state => state.room.roomList);
  const isLoading = useSelector(state => state.room.isLoading);


  const handleFormConfirm = () => {
    roomToEdit ? dispatch(editRoom({id: roomToEdit.id, name: roomName })) : dispatch(createRoom(roomName));
    
    setFormOpen(false);
    setRoomName('');
    roomToEdit && setRoomToEdit(null);
  }

  const handleDeleteRoom = (id: string) => {
    dispatch(deleteRoom(id));
  }

  const handlEditRoom = (room: Room) => {
    setRoomToEdit(room);
    setRoomName(room.name);
    setFormOpen(true);
  }

  return (
    <Container maxWidth="xl">
      <FormDialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        onConfirm={() => handleFormConfirm()}
        title={roomToEdit ? 'Edit room' : 'Create room'}
        description="Please enter the room name"
        buttonText="Save"
        form={
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
            variant="standard"
            value={roomName}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setRoomName(event.target.value)}
              }
          />
        }
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
          Rooms
        </h4>

        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Create room
        </Button>
      </Box>
      {
        !roomList.length || isLoading ? (
          <State 
            state={isLoading ? 'loading' : 'empty'} 
            emptyText="No rooms to display"
          />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead 
                titles={['Name', 'Created At', 'Updated At', 'Actions']}
              />
              <TableBody>
                {
                  roomList.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>
                        {room.name}
                      </TableCell>
                      <TableCell>
                        {moment(room.createdAt).format('YYYY-MM-DD HH:mm')} 
                      </TableCell>
                      <TableCell>
                        {moment(room.updatedAt).format('YYYY-MM-DD HH:mm')}
                      </TableCell>
                      <TableCell>
                        <TableMenu 
                          onDelete={() => handleDeleteRoom(room.id)}
                          onEdit={() => handlEditRoom(room)}
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