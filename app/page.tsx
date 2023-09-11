'use client'

import { 
  Paper, 
  Container,
  Box,
  useTheme,
  Button,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
import { State } from "@/app/components/States";
import { useEffect, useState } from "react";
import { 
  fetchMeetingList, 
  deleteMeeting,
  useDispatch, 
  useSelector, 
} from "@/lib/redux";
import { MeetingCreateForm } from "./components/FormMeeting";
import { MeetingTableView } from "./components/MeetingTableView";
import { ViewList, ViewModule } from "@mui/icons-material";
import { MeetingModuleView } from "./components/MeetingModuleView";

enum View {
  TABLE = 'table', 
  MODULE = 'module',
}

export default function Page() {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [formOpen, setFormOpen] = useState(false);
  const [viewType, setViewType] = useState<View>(View.MODULE)

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
          <Box>
            <Box mb={2} display="flex" justifyContent="flex-end">
              <ToggleButtonGroup>
                <ToggleButton 
                  value={View.TABLE} 
                  selected={viewType === View.TABLE}
                  onClick={() => setViewType(View.TABLE)}
                >
                  <ViewList />
                </ToggleButton>
                <ToggleButton 
                  value={View.MODULE} 
                  selected={viewType === View.MODULE}
                  onClick={() => setViewType(View.MODULE)}
                >
                  <ViewModule />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {viewType === View.TABLE && (
              <MeetingTableView 
                list={meetingList} 
                onClickDelete={handleDeleteMeeting} 
              />
            )}

            {viewType === View.MODULE && (
              <MeetingModuleView 
                list={meetingList}
                onClickDelete={handleDeleteMeeting} 
              />
            )}
          </Box>
        )
      }
    </Container>
  )
}