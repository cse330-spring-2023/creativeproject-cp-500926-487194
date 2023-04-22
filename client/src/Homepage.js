import { useState, useEffect, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { motion } from "framer-motion";

function ExplorePage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:1234/api/getUsersSortedByUpvotes")
      .then((response) => {
        console.log(response.data);
        const users = response.data.map((user) => ({
          displayName: user.displayName,
          userId: user.userId,
          upvoteCount: user.upvoteCount,
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
        <br></br>
          <div key={index}>
            <div class="exploreText">{user.displayName}</div>
            <Profile userId={user.userId} upvoteId={props.upvoteId} upvoteCount={user.upvoteCount}/>
          </div>
        </>
      ))}
    </>
  );
}

function DisplayUserSongs(props) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(props.upvoteCount);

  useEffect(() => {
    axios
      .post("http://localhost:1234/api/getIfUpvoted", {
        userId: props.upvoteId,
        postId: props.userId,
      })
      .then((result) => {
        console.log(result);
        if (result.data) {
          setIsUpvoted(true);
        } else {
          setIsUpvoted(false);
        }
      });
  });

  const handleUpvotePressed = () => {
    console.log("changing upvote status");
    console.log(props.upvoteId);
    axios
      .post("http://localhost:1234/api/upvoteAndDownvote", {
        userId: props.upvoteId,
        postId: props.userId,
      })
      .then((result) => {
        setIsUpvoted(result);
        if(isUpvoted) {
          setVoteCount(voteCount - 1);
        }
        else {
          setVoteCount(voteCount + 1);
        }
      });
  };

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
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        id="votes"
        className="heartBox"
      >
      <div class="upVoteCount"> {voteCount} </div>
        {isUpvoted ? (
          <img
            src="/heartfilled_64.svg"
            alt="evan"
            className="heartSizeFull"
            onClick={handleUpvotePressed}
          />
        ) : (
          <img
            src="/heart-64.svg"
            alt="heart"
            className="heartSizeEmpty"
            onClick={handleUpvotePressed}
          />
        )}
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
      {haveCovers ? (
        <DisplayUserSongs
          songCover={songCovers}
          displayName={props.displayName}
          userId={props.userId}
          upvoteId={props.upvoteId}
          upvoteCount={props.upvoteCount}
        />
      ) : (
        <></>
      )}
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
  };
  const goToProfile = () => {
    setHomePage(true);
  };

  return (
    <>
      <div className="background">
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
          <Profile userId={userData.userId} upvoteId={userData.userId} />
        ) : (
          <ExplorePage upvoteId={userData.userId} />
        )}
      </div>
    </>
  );
}

export default Homepage;
