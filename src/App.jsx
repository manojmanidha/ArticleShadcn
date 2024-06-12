import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button"
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
    <div style={{paddingRight:20, paddingLeft:20, maxWidth:800, margin:'auto'}}>

      <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between',padding:10, backgroundColor:'#dfdfdf'}}>
        <div style={{fontWeight:500, paddingLeft:20, fontFamily:'sans-serif'}}>
          Article App
        </div>
        <div style={{paddingRight:20}}>
          { token ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : null}
        </div>
      </div>

      {!token ? (
        <AuthForm setToken={setToken} setRole={setRole} />
      ) : (
        <>
          <ArticleList token={token}  />
          {role === 'admin' && <ArticleForm token={token} />}
        </>
      )}
    </div>
  );
}

export default App;
