import React, { useState } from 'react';


function LoginRegister({onLogin, onRegister}) {

    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const loginHandler = e => {

        e.preventDefault();
        onLogin(loginData);
        console.log(loginData);
        
    }
    const registerHandler = e => {

        e.preventDefault();
        onRegister();
        console.log(loginData);
        
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setLoginData(prevLoginData => ({
        ...prevLoginData,
        [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={loginHandler}>

            Username: <input type="text" name="username" value={loginData.username} onChange={handleChange}/>
            <br />
            Password: <input type="password" name="password" value={loginData.password} onChange={handleChange}/>
            <br />
            <button type="submit">Login</button>
            </form>

            <form onSubmit={registerHandler}>
            <button type="submit">Register</button>
            </form>

        </div>
    );
}

export default LoginRegister;