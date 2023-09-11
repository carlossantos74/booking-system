'use client'

import { Autocomplete, FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'


import { FormDialog } from "@/app/components/FormDialog";
import { createMeeting, fetchUserList, useDispatch, useSelector } from "@/lib/redux";
import { Box } from './styles'
import { User } from "@prisma/client";
import { MeetingCreationBody } from "@/app/api/meetings/types";

type MeetingCreateFormProps = {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const shema = Yup.object().shape({
  title: Yup.string().min(1).required('Required'),
  date: Yup.date().min(1).required('Required'),
  start: Yup.date().min(1).required('Required'),
  end: Yup.date().min(Yup.ref('start')).required('Required'),
  users: Yup.array().min(1).required('Required'),
})

type MeetingCreateFormValues = {
  title: string | null
  date: Date | null
  start: Date | null
  end: Date | null
  users: User[];
}

const mergeDateAndTime = (date: Date, time: Date): string => {
  date = new Date(date);
  time = new Date(time);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ).toISOString()
}

export function MeetingCreateForm({ open, onClose }: MeetingCreateFormProps) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.userList);
  const formik = useFormik({
    initialValues: { 
      title: null,
      date: null,
      start: null,
      end: null,
      users: [],
    },
    validationSchema: shema,
    onSubmit: async (data: MeetingCreateFormValues) => {
      const { title, date, start, end, users } = data;

      if(!title || !date || !start || !end || !users) return;

      const payload: MeetingCreationBody = {
        name: title,
        timeToStart: mergeDateAndTime(date, start),
        timeToEnd: mergeDateAndTime(date, end),
        users: users.map((user: User) => user.id),
      };

      dispatch(createMeeting(payload));
      formik.resetForm();
      onClose(false);
    },
  })

  useEffect(() => {
    if(!users.length) {
      dispatch(fetchUserList());
    }

    if(!open) {
      formik.resetForm();
    }
  }, [open])

  const submit = () => {
    formik.handleSubmit();
  }

  return (
    <FormDialog
      open={open} 
      onClose={() => onClose(false)}
      onConfirm={() => submit()}
      title="Create meeting"
      description=""
      buttonText="Save"
      form={
        <FormControl fullWidth>
          <Box>
            <TextField 
              fullWidth
              label="Meeting title"
              value={formik.values.title}
              onChange={(event) => formik.setFieldValue('title', event.target.value)}
              error={formik.touched.title && Boolean(formik.errors.title)}
            />
          </Box>
          <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              label="Date" 
              sx={{ width: '100%' }} 
              value={formik.values.date}
              onChange={(newValue) => formik.setFieldValue('date', newValue)}         
              slotProps={{
                textField: {
                  error: formik.touched.date && Boolean(formik.errors.date)
                }
              }}
            />
          </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker 
                label="Start" 
                value={formik.values.start}
                onChange={(newValue) => formik.setFieldValue('start', newValue)}
                slotProps={{
                  textField: {
                    error: formik.touched.start && Boolean(formik.errors.start)
                  }
                }}
              />
              <TimePicker 
                label="End" 
                value={formik.values.end}
                onChange={(newValue) => formik.setFieldValue('end', newValue)}
                slotProps={{
                  textField: {
                    error: formik.touched.end && Boolean(formik.errors.end)
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <Autocomplete
              multiple
              fullWidth
              getOptionLabel={(option) => option.name}
              options={users}
              value={formik.values.users}
              onChange={(event, newValue) => {
                formik.setFieldValue('users', newValue)
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Users" 
                  error={formik.touched.users && Boolean(formik.errors.users)}
                />
              )}
            />
          </Box>
        </FormControl>
      }
    />
  )
}