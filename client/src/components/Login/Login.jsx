// components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', loginForm);
      Navigate('/Home')
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div className='login-form-container'>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <h2>Login</h2>
      </div>
      <div>
        <label><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
</label>
        <input type="email" name="email" value={loginForm.email} onChange={handleInputChange} placeholder='Enter your email...' />
      </div>
      <div>
        <label><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg></label>
        <input type="password" name="password" value={loginForm.password} onChange={handleInputChange} placeholder='Enter your password...' />
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <button onClick={handleLogin} className='button'>Login</button>
      </div>
      <div className='register-link'>
        <h4>Don't have an account?</h4>
        <button onClick={() => Navigate('/register')} className='button'>Register</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
