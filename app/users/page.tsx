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
  TextField
} from "@mui/material";
import { User } from '@prisma/client';
import moment from 'moment';
import { TableMenu, TableHead } from "@/app/components/Table";
import { FormDialog } from "../components/FormDialog";
import { useState } from "react";

const createData = ({ id, name, createdAt, updatedAt }: User) => ({
  id,
  name, 
  createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm'),
  updatedAt: moment(updatedAt).format('YYYY-MM-DD HH:mm'),
});

const rows = [
  createData({ id: 'any-id', name: 'John Doe', createdAt: new Date(), updatedAt: new Date() }),
  createData({ id: 'any-id-2', name: 'Jane Doe', createdAt: new Date(), updatedAt: new Date() }),
];

export default function Page() {
  const [formOpen, setFormOpen] = useState(false)
  const theme = useTheme()

  return (
    <Container maxWidth="xl">
      <FormDialog 
        open={formOpen} 
        onClose={() => setFormOpen(false)}
        onConfirm={() => setFormOpen(false)}
        title="Create user"
        description="Create a new user to participate the meetings"
        buttonText="Create user"
        form={
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead 
            titles={['Name', 'Created At', 'Updated At', 'Actions']}
          />
          <TableBody>
            {
              rows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.createdAt} 
                  </TableCell>
                  <TableCell>
                    {user.updatedAt} 
                  </TableCell>
                  <TableCell>
                    <TableMenu />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}