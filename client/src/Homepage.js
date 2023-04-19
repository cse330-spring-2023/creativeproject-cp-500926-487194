import { useState, useEffect, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { motion } from "framer-motion";

function ExplorePage() {
  const [users, setUsers] = useState([]);



  useEffect(() => {
    axios
      .post("http://localhost:1234/api/getAllUsers")
      .then((response) => {
          console.log(response.data);
          const users = response.data.map(user => ({
            displayName: user.displayName,
            userId: user.userId
          }));
          setUsers(users);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log("***USERS:***");
  console.log(users);

  return (
    <>
      {users.map((user, index) => (
        <>
      <div key={index}>
        <Profile userId={user.userId} displayName={user.displayName} />
      </div>
        </>

      ))}
      </>
  );}

function DisplayUserSongs(props) {
  console.log(props);
  return (
    <div className="userCard">
      {props.displayName}
      <br></br>
      <motion.div id="song1" className="songBox">
        <img src={props.songCover[0]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song2" className="songBox">
        <img src={props.songCover[1]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song3" className="songBox">
        <img src={props.songCover[2]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song4" className="songBox">
        <img src={props.songCover[3]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song5" className="songBox">
        <img src={props.songCover[4]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="votes" className="heartBox">
        <img src="" alt="heart" className="heartSize" />
      </motion.div>
    </div>
  );
}

function Profile(props) {
  const [songCovers, setSongCovers] = useState([]);
  const [haveCovers, setHaveCovers] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:1234/api/getUser", {
        userId: props.userId,
      })
      .then((response) => {
        setSongCovers([
          response.data[0].song1.cover,
          response.data[0].song2.cover,
          response.data[0].song3.cover,
          response.data[0].song4.cover,
          response.data[0].song5.cover,
        ]);
        setHaveCovers(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <br />
      {haveCovers ? <DisplayUserSongs songCover={songCovers} displayName={props.displayName} /> : <></>}
    </>
  );
}

function Explore() {}

function Leaderboard() {}

function Settings() {}

function Homepage({ userData }) {
  const [token, setToken] = useState(userData.token);
  const [homePage, setHomePage] = useState(true);

  




const goToExplore = () => {
    setHomePage(false);
}
const goToProfile = () => {
  setHomePage(true);
}



  return (
      <>
          <h1> Hello {userData.displayName}!</h1>



          <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#66dd67",
          }}
          whileTap={{ scale: 0.9 }}
          id="userProfile"
          className="navButton"
          onClick={goToProfile}
        >
          <p className="text">Profile</p>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#66dd67",
          }}
          whileTap={{ scale: 0.9 }}
          id="explore"
          className="navButton"
          onClick={goToExplore}
        >
          <p className="text">Explore</p>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#66dd67",
          }}
          whileTap={{ scale: 0.9 }}
          id="leaderboard"
          className="navButton"
        >
          <p className="text">Leaderboard</p>
        </motion.div>




          
          <Settings />
        {homePage ? (
          <>
            <Profile userId={userData.userId} displayName={userData.displayName} />
          </>
          ) : 
      
      <ExplorePage />

      }
    </>
  );
}

export default Homepage;