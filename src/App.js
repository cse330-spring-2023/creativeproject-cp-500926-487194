import './App.css';
import React, { useState } from "react";
import LoginRegister from './LoginRegister'
import Homepage from './Homepage'
import Registration from './Registration'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [loginData,setLoginData] = useState({
    username:"",
    password:""
});

const handleLogin = (userData) => {
  // JQUERY REQUEST TO GET ALL THE DATA NEEDED FOR THE HOMEPAGE
  setLoginData(userData);
  setLoggedIn(true);
};

const makeAccount = (userData) => {
  // MAKE AN ACCOUNT IDFK
  setLoginData(userData);
  setLoggedIn(true);
}

const toRegister = () => {
  setRegistering(true);
};



  return (
    <>
{
loggedIn ? (
        <Homepage userData={loginData}/>
      ) : registering ? (
        <Registration makeAccount={makeAccount}/>
      ) : (
        <LoginRegister onLogin={handleLogin} onRegister={toRegister} />
      )}
    </>
    
  );
}

export default App;
