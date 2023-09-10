'use client'

import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

type FormDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void,
  title: string
  description?: string
  buttonText?: string
  form: React.ReactNode
}

export function FormDialog ({ 
    open, 
    title,
    description,
    buttonText,
    onClose, 
    onConfirm, 
    form,
  }: FormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h4">
        {title}
      </DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        {
          description && (
            <DialogContentText>
              { description }
            </DialogContentText>
          )
        }
        { form }
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onConfirm()}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  )
}