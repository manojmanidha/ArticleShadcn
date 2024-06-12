import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AuthForm from './components/AuthForm';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import Cookies from 'js-cookie'; // Import js-cookie

function App() {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [role, setRole] = useState(Cookies.get('role') || null);

  // Use useEffect to update the state if cookies change
  useEffect(() => {
    setToken(Cookies.get('token') || null);
    setRole(Cookies.get('role') || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    setToken(null);
    setRole(null);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Article App
          </Typography>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        {!token ? (
          <AuthForm setToken={setToken} setRole={setRole} />
        ) : (
          <>
            <ArticleList token={token} />
            {role === 'admin' && <ArticleForm token={token} />}
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
