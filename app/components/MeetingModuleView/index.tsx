import { Meeting } from "@/app/api/meetings/types";
import { Box, Grid, Typography } from "@mui/material";
import moment from "moment";
import { Grid as GridItem } from './styles';
import { MeetingCard } from "../MeetingCard/MeetingCard";

type MeetingModuleViewProps = {
  list: Meeting[]
  onClickDelete: (id: string) => void
}

export function MeetingModuleView({ list, onClickDelete  }: MeetingModuleViewProps) {
  const meetingPerDate: Record<string, Meeting[]> = {};

  list.forEach((meeting) => {
    const date = moment(meeting.timeToStart).format('YYYY-MM-DD');

    if(!meetingPerDate[date]) {
      meetingPerDate[date] = [];
    }

    meetingPerDate[date].push(meeting);
  });

  return (
    <Grid
      container
      wrap="nowrap"
      sx={{
        gap: 2,
        width: '100%',
        height: '100%',
        overflowX: 'auto',
      }}
    >
      {
        Object.keys(meetingPerDate).map((date, index) => (
          <GridItem overflow="scroll" item key={index}>
            <Typography variant="h5" my={2} mx={1}> Meetings of the day:  { date }</Typography>
            <Box>
              {
                meetingPerDate[date].map((meeting) => (
                  <MeetingCard 
                    key={meeting.id} 
                    meeting={meeting} 
                    onDelete={onClickDelete}
                  />
                ))
              }
            </Box>
          </GridItem>
        ))
      }
    </Grid>
  )
}