import React, { useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Logout = () => {
  useEffect( () => {
    const LogoutUser = async () => {
      try {
        // const navigate = useNavigate();
        await axios.post('/user/logout');
        // navigate('/dashboard/app', { replace: true });
        window.location.href='/dashboard/app';
      } catch (error) {
        alert(error);
      }
    };
    LogoutUser();
  }, []);
  return (
    <>
      <h1 className='text-center'>Logging out...</h1>
    </>
  );
};

export default Logout;
