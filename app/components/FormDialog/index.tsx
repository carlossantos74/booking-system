'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  )
}