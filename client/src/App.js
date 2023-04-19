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
  setLoginData(userData);
  setLoggedIn(true);
};

const makeAccount = (userData) => {
  setLoginData(userData);
  setLoggedIn(true);
}

const toRegister = () => {
  setRegistering(true);
};



  return (
    <div class="background">
{
loggedIn ? (
        <Homepage userData={loginData}/>
      ) : registering ? (
        <Registration makeAccount={makeAccount}/>
      ) : (
        <LoginRegister onLogin={handleLogin} onRegister={toRegister} />
      )}
    </div>
    
  );
}

export default App;
