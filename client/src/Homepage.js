import { useState, useEffect, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { motion } from "framer-motion";

function NavBar() {
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.1,
          backgroundColor: "#66dd67",
        }}
        whileTap={{ scale: 0.9 }}
        id="userProfile"
        className="navButton"
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
    </>
  );
}

function DisplayUserSongs({ userData }) {
  const [songIdArr, setSongIdArr] = useState([]);

  useEffect(() => {
    console.log("USER ID: " + userData.userId);
    axios.post("http://localhost:1234/api/getUser", { userId: userData.userId }).then((response) => {
      setSongIdArr([...songIdArr, response.song1.songId]);
      setSongIdArr([...songIdArr, response.song2.songId]);
      setSongIdArr([...songIdArr, response.song3.songId]);
      setSongIdArr([...songIdArr, response.song4.songId]);
      setSongIdArr([...songIdArr, response.song5.songId]);
    })
    .catch((error) => {
      console.log(error);
    });

    //Chain axios spotify gets to make the album covers
  });
  return (
    <>
      <motion.div id="song1" className="songBox">
        <img
          src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"
          alt="album cover"
          className="song"
        />
      </motion.div>
      <motion.div id="song2" className="songBox">
        <img
          src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"
          alt="album cover"
          className="song"
        />
      </motion.div>
      <motion.div id="song3" className="songBox">
        <img
          src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"
          alt="album cover"
          className="song"
        />
      </motion.div>
      <motion.div id="song4" className="songBox">
        <img
          src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"
          alt="album cover"
          className="song"
        />
      </motion.div>
      <motion.div id="song5" className="songBox">
        <img
          src="https://i.scdn.co/image/ab67616d00001e027359994525d219f64872d3b1"
          alt="album cover"
          className="song"
        />
      </motion.div>
      <motion.div id="votes" />
    </>
  );
}

function Profile({ userData }) {
  return (
    <>
      <br />
      <DisplayUserSongs userData={userData} />
    </>
  );
}

function Explore() {}

function Leaderboard() {}

function Settings() {}

function Homepage({ userData }) {
  const [userId, setUserId] = useState(userData.userId);
  const [token, setToken] = useState(userData.token);
  useEffect(() => {
    /*axios.get("http://localhost:1234/api/get").then((data) => {
      setUserList(data.data);
    });*/
  }, []);

  return (
    <div className="background">
      <h1> Hello {/* displayName of user */}!</h1>
      <NavBar />
      <Profile userData={userData} />
      <Settings />
    </div>
  );
}

export default Homepage;
