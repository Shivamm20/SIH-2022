import * as Yup from 'yup';
import { useState,useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
//
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { GlobalState } from '../../../GLobalState';
// ----------------------------------------------------------------------

export default function LoginForm() {
  // const navigate = useNavigate();
  const state=useContext(GlobalState);
  const [callback,setCallback] = state.districtApi.callback;
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    // handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async () => {
  //   navigate('/dashboard', { replace: true });
  // };
  
  const [loginDetails,setLoginDetails] = useState({email:"",password:""});
  const handleSubmitNew=async(e)=>{
    e.preventDefault();
    try {
      await axios.post('/user/login',{...loginDetails});
      setCallback(!callback);
      window.location.href='/dashboard/app';
      console.log("Login form submitted!");
      // localStorage.setItem('firstLogin',true);
      // navigate('/dashboard/app', { replace: true });

  } catch (err) {
      toast.error(err.response.data.msg);
  }
    
  }
  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <FormProvider methods={methods} onSubmit={handleSubmitNew}>
      <ToastContainer/>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" value={loginDetails.email} onChange={(e)=>setLoginDetails({...loginDetails,email:e.target.value})} />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginDetails.password} 
          onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
