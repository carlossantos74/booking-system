import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { TableHead, TableMenu } from "../Table";
import moment from "moment";
import { Meeting } from "@/app/api/meetings/types";


type MeetingTableViewProps = {
  list: Meeting[]
  onClickDelete: (id: string) => void
}

export function MeetingTableView({ list, onClickDelete  }: MeetingTableViewProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead 
          titles={[
            'Name', 
            'Start',
            'End',
            'Room',
            'Users',
            'Actions'
          ]}
        />
        <TableBody>
          {
            list.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>
                  {meeting.name}
                </TableCell>
                <TableCell>
                  {moment(meeting.timeToStart).format('YYYY-MM-DD hh:mm A')} 
                </TableCell>
                <TableCell>
                  {moment(meeting.timeToEnd).format('YYYY-MM-DD hh:mm A')}
                </TableCell>
                <TableCell>
                  {meeting.room?.name || '-'}
                </TableCell>
                <TableCell>
                  {meeting.users.map((user, index) => (
                    <Typography key={user.id}>
                      {index + 1} - {user.name}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <TableMenu 
                    onDelete={() => onClickDelete(meeting.id)}
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