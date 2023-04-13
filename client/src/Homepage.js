import { useState,useEffect,Component } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'


function Homepage({userData}) {
    
    const [userList,setUserList] = useState([]);


        useEffect(()=>{
            axios.get("http://localhost:1234/api/get").then((data)=>{
                setUserList(data.data)
            });
            },[])
    



    return (
        <>
            <p> Hello! </p>
            <img src="./evan.jpg"></img>
            <h2>Users: </h2>
            <ul>
                {userList.map(user => (
                    <div key={user.id}>
                    <li key={"list_" + user.id}>Username: {user.display_name}</li>
                        <ul>
                        <li key="header">database user id below</li>
                        <li key="user_id">{user.id}</li>
                        <li key="song1"> Now from spotify</li>
                        <li key="song2">{JSON.stringify(userData)}</li>
                        </ul>
                    </div>
                ))}
            </ul>
            <p>End of Users </p>
        </>
    )

}

export default Homepage;