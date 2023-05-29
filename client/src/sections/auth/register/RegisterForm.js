import * as Yup from 'yup';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
//
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    // handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });
  // };
  const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '',user_type:0 });
  //  let true= student ; false=collaborator
  const [checked,setChecked] =useState(true);
  const handleSubmitNew = async (e) => {
    e.preventDefault();
    try {
      if (checked===false) setUserDetails({...userDetails,user_type:1});
      await axios.post('/user/register', { ...userDetails });
      window.location.href = '/dashboard/app';
      console.log('Signup form submitted!');
      // localStorage.setItem('firstLogin',true);
      // navigate('/dashboard/app', { replace: true });
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmitNew}>
      <ToastContainer />

      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField
            name="name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            label="Full name"
          />
          {/* <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" /> */}
        </Stack>

        <RHFTextField
          name="email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          label="Email address"
        />

        <RHFTextField
          name="password"
          value={userDetails.password}
          label="Password"
          onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <form>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" value="student" id="flexRadioDefault1" defaultChecked={checked} onChange={()=>setChecked(!checked)}/>
            {/* <label className="form-check-label" htmlFor="flexRadioDefault1"> */}
              Student
            {/* </label> */}
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" value="collaborator" id="flexRadioDefault2" defaultChecked={!checked} onChange={()=>setChecked(!checked)}/>
            {/* <label className="form-check-label" htmlFor="flexRadioDefault2"> */}
              Collaborator
            {/* </label> */}
          </div>
        </form>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
