import  Axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';

function Login() {
  const cookies = new Cookies();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
      Axios.post('http://localhost:3001/login', {username, password}).then((res )=> {
        const {
           token, userId, firstName, lastName, username, hashedPassword
        } = res.data;
        cookies.set('token', token);
        cookies.set('userId', userId);
        cookies.set('username', username);
        cookies.set('firstName', firstName);
        cookies.set('lastName', lastName);
      }).catch((error) => {
        console.error('Error en la solicitud:', error);
      });
    }

  return (
    <div className='login'>
    <label>Login</label>
    <input 
       placeholder='UserName'
       onChange={(e) => {
        setUserName(e.target.value)
       }}
    />
    <input 
       placeholder='Password'
       onChange={(e) => {
        setPassword(e.target.value)
       }}
    />
    <button onClick={login}>Login</button>
</div>
  )
}

export default Login