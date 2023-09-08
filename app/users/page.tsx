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
  Typography
} from "@mui/material";
import { User } from '@prisma/client';
import moment from 'moment';
import { TableMenu, TableHead } from "@/app/components/Table";
import { FormDialog } from "@/app/components/FormDialog";
import { State } from "@/app/components/States";
import { useEffect, useState } from "react";
import { 
  fetchUserList, 
  createUser, 
  deleteUser, 
  editUser, 
  useDispatch, 
  useSelector 
} from "@/lib/redux";

export default function Page() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [userName, setUserName] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  useEffect(() => { 
    dispatch(fetchUserList());
  }, [])


  const userList = useSelector(state => state.user.userList);
  const isLoading = useSelector(state => state.user.isLoading);


  const handleFormConfirm = () => {
    userToEdit ? dispatch(editUser({id: userToEdit.id, name: userName })) : dispatch(createUser(userName));
    
    setFormOpen(false);
    setUserName('');
    userToEdit && setUserToEdit(null);
  }

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  }

  const handlEditUser = (user: User) => {
    setUserToEdit(user);
    setUserName(user.name);
    setFormOpen(true);
  }

  return (
    <Container maxWidth="xl">
      <FormDialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        onConfirm={() => handleFormConfirm()}
        title={userToEdit ? 'Edit user' : 'Create user'}
        description="Please enter the user name"
        buttonText="Save"
        form={
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(event.target.value)}
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
          Users
        </h4>

        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Create user
        </Button>
      </Box>
      {
        !userList.length || isLoading ? (
          <State 
            state={isLoading ? 'loading' : 'empty'} 
            emptyText="No users to display"
          />
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead 
                titles={['Name', 'Created At', 'Updated At', 'Actions']}
              />
              <TableBody>
                {
                  userList.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.name}
                      </TableCell>
                      <TableCell>
                        {moment(user.createdAt).format('YYYY-MM-DD HH:mm')} 
                      </TableCell>
                      <TableCell>
                        {moment(user.updatedAt).format('YYYY-MM-DD HH:mm')}
                      </TableCell>
                      <TableCell>
                        <TableMenu 
                          onDelete={() => handleDeleteUser(user.id)}
                          onEdit={() => handlEditUser(user)}
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