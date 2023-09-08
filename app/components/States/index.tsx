import { Box, CircularProgress, Typography } from "@mui/material"


export type StateType = 'loading' | 'error' | 'empty'

export type StateProps = {
  state: StateType
  emptyText?: string
  errorText?: string
}

export function State({ state, errorText, emptyText }: StateProps) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: 200,
    }}>
      {state === 'loading' && <CircularProgress />}
      {state === 'error' && (
        <Typography>
          { errorText ?? 'An error has occurred, please try again later'}
        </Typography>
      )}
      {state === 'empty' && (
        <Typography>
          { emptyText ?? 'No data to display'}
        </Typography>
      )}
    </Box>
  )
}