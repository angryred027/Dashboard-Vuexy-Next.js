'use client'

// React Imports
import { useState } from 'react'
import { getSession } from "next-auth/react";

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { ToastContainer, toast } from 'react-toastify';

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { signOut, useSession } from 'next-auth/react'
// Component Imports

const AccountDelete = () => {
  // States


  // Hooks
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  // Vars
  const checkboxValue = watch('checkbox')

  const onSubmit = async () => {
    const session = await getSession();
    const user = session.user;
    if (user) {
      const email = user.email;
      const res = await fetch('/api/profile', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });
      const obj = await res.json();
      if (res && res.ok) {
        toast.success(obj.success.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
      } else {
        toast.error(obj.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    else {
      return;
    }
  }

  return (
    <Card>
      <CardHeader title='Delete Account' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={Boolean(errors.checkbox)} className='is-full mbe-6'>
            <Controller
              name='checkbox'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label='I confirm to delete my account.' />
              )}
            />
            {errors.checkbox && <FormHelperText error>Please confirm you want to delete account</FormHelperText>}
          </FormControl>
          <Button variant='contained' color='error' type='submit' disabled={!checkboxValue}>
            Delete Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDelete
