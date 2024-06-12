import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'; // Import js-cookie
import { register, login } from '../services/auth';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
    <div style={{display:'flex', flexDirection:'column', rowGap:10}}>
      <div style={{fontWeight:500,marginTop:15,padding:5, fontFamily:'sans-serif'}}>
        {isRegister ? 'Register' : 'Login'}
      </div>

      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', rowGap:20}} >
        
        <Input
          placeholder="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          placeholder="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegister && (

            <Select 
            onValueChange={(value) => setRoleInput(value)}
            required
            >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select user Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{role}</SelectLabel>
                <SelectItem  value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
            </Select>
        )}

        <div >
          <Button type="submit" color="primary">
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </div>
        <div>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Login' : 'Need to register?'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
