import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Cookies from 'js-cookie'; // Import js-cookie
import { register, login } from '../services/auth';

const AuthForm = ({ setToken, setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleInput] = useState('user'); // Default role is 'user'
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password, role };
      if (isRegister) {
        await register(userData);
        setIsRegister(false);
      } else {
        const { token } = await login(userData);
        setToken(token);

        // Decode JWT to get user role
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decoded = JSON.parse(window.atob(base64));
        setRole(decoded.role);

        // Set token and role in cookies
        Cookies.set('token', token, { expires: 1, secure: true,}); // 1 day expiration, secure, 
        Cookies.set('role', decoded.role, { expires: 1, secure: true,});
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>{isRegister ? 'Register' : 'Login'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegister && (
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRoleInput(e.target.value)}
              required
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        )}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Box>
        <Box mt={2}>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : 'Need to register?'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AuthForm;
