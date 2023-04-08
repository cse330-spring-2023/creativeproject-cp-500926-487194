import React, { useState } from 'react';


function Registration({makeAccount}) {

    const [regData, setRegData] = useState({ username: '', password: '' , passcheck: ''});


    const handleChange = e => {

        if(regData.password !== regData.passwordCheck) {
            // DISPLAY MESSAGE PASSWORDS DO NOT MATCH
        }

        const {name, value} = e.target;
        setRegData(prevRegData => ({
        ...prevRegData,
        [name]: value
        }));
    }

    function registerHandler() {
        makeAccount(regData)
    }



    return (
        <div>
            <form onSubmit={registerHandler}>

            Username: <input type="text" name="username" value={regData.username} onChange={handleChange}/>
            <br />
            Password: <input type="password" name="password" value={regData.password} onChange={handleChange}/>
            <br />
            Repeat: <input type="password" name="passcheck" value={regData.passcheck} onChange={handleChange}/>
            <br />
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;