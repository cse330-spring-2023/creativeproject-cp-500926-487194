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

function DisplayUserSongs(props) {
  console.log(props);
  return (
    <>
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
      <motion.div id="votes" />
    </>
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
      {haveCovers ? <DisplayUserSongs songCover={songCovers} /> : <></>}
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
      <Profile userId={userId} />
      <Settings />
    </div>
  );
}

export default Homepage;
