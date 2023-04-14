import { useState, useEffect, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Homepage({ userData }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    /*axios.get("http://localhost:1234/api/get").then((data) => {
      setUserList(data.data);
    });*/
  }, []);

  return (
    <>
      <h1> Hello {/* displayName of user */}!</h1>
      <div id="nav">
        {/* this is meant to be a navigation bar. userProfile will be inline */}
        <div id="userProfile">
          <p>Profile</p>
        </div>
        <div id="explore">
          <p>Explore</p>
        </div>
      </div>
      <div id="mainPage">
        {/* This is what react is going to edit between toggling pages. Have to learn how to do this i guess. Since this is the home page
        I am going to make it look like the profile page */}
        <div id="topSongs">
          <div id="song1"></div>
          <div id="song2"></div>
          <div id="song3"></div>
          <div id="song4"></div>
          <div id="song5"></div>
          <div id="votes"></div>
        </div>
        <div id="settings">
          {/* not sure if to just show every setting or if to have it pop down could be a good spot for animation */}
        </div>
      </div>

      {/*
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
        */}
    </>
  );
}

export default Homepage;
