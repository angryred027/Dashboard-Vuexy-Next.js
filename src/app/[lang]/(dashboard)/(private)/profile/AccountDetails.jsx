'use client'

// React Imports
import { useState, useEffect } from 'react'
import { getSession } from "next-auth/react";
// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { ToastContainer, toast } from 'react-toastify';

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
const schema = object({
  fullName: pipe(string(), nonEmpty("This filed is required")),
  userName: pipe(string(), nonEmpty("This filed is required")),
  email: pipe(string(), minLength(1, 'This field is required'), email('Email is invalid')),
  password: pipe(
    string(),
    nonEmpty('This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  ),
  telegram: string(),
})

const AccountDetails = () => {
  const [user, setUser] = useState({});
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (!session) {
        return;
      }
      const email = session?.user.email;
      const apiUrl = `/api/profile?email=${email}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res && res.ok) {
        const obj = await res.json();
        const user = obj.data;
        setUser(user);
        reset({
          fullName: user.fullName || '',
          userName: user.userName || '',
          email: user.email || '',
          password: '',
          telegram: user.telegram || '',
        });
      }
      else {
        return;
      }
    }
    fetchData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      telegram: '',
    }
  });

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const onSubmit = async data => {
    setErrorState(null);

    const fullName = data.fullName;
    const userName = data.userName;
    const email = data.email;
    const password = data.password;
    const telegram = data.telegram;
    console.log("telegram", telegram);
    const res = await fetch('/api/profile', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, userName, email, password, telegram }),
    });

    const resData = await res.json();
    if (res && res.ok) {
      toast.success(resData.success.message, {
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
    else {
      setErrorState(resData.error);
      toast.error(resData.error.message, {
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

  return (
    <Card>
      <CardContent>
        <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='fullName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    type='text'
                    label='* Full Name'
                    placeholder='Enter your full name'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.fullName || errorState?.error?.fullName) && {
                      error: true,
                      helperText: errors?.fullName?.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='userName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    type='text'
                    label='* User Name'
                    placeholder='Enter your user name'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.userName || errorState?.error?.userName) && {
                      error: true,
                      helperText: errors?.userName?.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    autoFocus
                    fullWidth
                    type='email'
                    label='* Email'
                    placeholder='Enter your email'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.email || errorState?.error?.email) && {
                      error: true,
                      helperText: errors?.email?.message || errorState?.error?.email?.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ sx: 12, sm: 6 }}>
              <Controller
                name='telegram'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Telegram'
                    placeholder='@johndoe'
                    type='text'
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    {...((errors.telegram || errorState?.error?.telegram) &&
                    {
                      error: true,
                      helperText: errors?.telegram?.message || errorState?.error?.telegram?.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='* Password'
                    placeholder='············'
                    id='signup-password'
                    type={isPasswordShown ? 'text' : 'password'}
                    onChange={e => {
                      field.onChange(e.target.value)
                      errorState !== null && setErrorState(null)
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    }}
                    {...((errors.password || errorState?.error?.password) &&
                    {
                      error: true,
                      helperText: errors?.password?.message || errorState?.error?.password?.message
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} className='flex gap-4 flex-wrap pt-4'>
              <Button variant='contained' type='submit' >
                Save Changes
              </Button>
              <Button variant='tonal' type='reset' color='secondary'>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
