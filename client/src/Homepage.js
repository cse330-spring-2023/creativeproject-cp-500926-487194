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
          random: Math.random(),
        }));
        setUsers(users.sort((a, b) => a.random - b.random));
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
          <div>
            <div class="exploreText">{user.displayName}</div>
            <Profile
              key={user.userId}
              userId={user.userId}
              upvoteId={user.userId}
              upvoteCount={user.upvoteCount}
              isExplorePage={true}
            />
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
        if (isUpvoted) {
          setVoteCount(voteCount - 1);
        } else {
          setVoteCount(voteCount + 1);
        }
      });
  };

  return (
    <div className="userCard">
      <br></br>
      <motion.div id="song1" className="songBox">
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          class="textHover"
        >
          <b>{props.songName[0]}</b>
          <br />
          {props.songArtist[0]}
          <br />
          {props.songAlbum[0]}
        </motion.div>
        <img src={props.songCover[0]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song2" className="songBox">
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          class="textHover"
        >
          <b>{props.songName[1]}</b>
          <br />
          {props.songArtist[1]}
          <br />
          {props.songAlbum[1]}
        </motion.div>
        <img src={props.songCover[1]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song3" className="songBox">
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          class="textHover"
        >
          <b>{props.songName[2]}</b>
          <br />
          {props.songArtist[2]}
          <br />
          {props.songAlbum[2]}
        </motion.div>
        <img src={props.songCover[2]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song4" className="songBox">
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          class="textHover"
        >
          <b>{props.songName[3]}</b>
          <br />
          {props.songArtist[3]}
          <br />
          {props.songAlbum[3]}
        </motion.div>
        <img src={props.songCover[3]} alt="album cover" className="song" />
      </motion.div>
      <motion.div id="song5" className="songBox">
        <motion.div
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          class="textHover"
        >
          <b>{props.songName[4]}</b>
          <br />
          {props.songArtist[4]}
          <br />
          {props.songAlbum[4]}
        </motion.div>
        <img src={props.songCover[4]} alt="album cover" className="song" />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        id="votes"
        className="heartBox"
      >
        {props.isExplorePage ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
}

function Profile(props) {
  const [songCovers, setSongCovers] = useState([]);
  const [songName, setSongName] = useState([]);
  const [songArtist, setSongArtist] = useState([]);
  const [songAlbum, setSongAlbum] = useState([]);
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
        setSongName([
          response.data[0].song1.songTitle,
          response.data[0].song2.songTitle,
          response.data[0].song3.songTitle,
          response.data[0].song4.songTitle,
          response.data[0].song5.songTitle,
        ]);
        setSongArtist([
          response.data[0].song1.artist,
          response.data[0].song2.artist,
          response.data[0].song3.artist,
          response.data[0].song4.artist,
          response.data[0].song5.artist,
        ]);
        setSongAlbum([
          response.data[0].song1.album,
          response.data[0].song2.album,
          response.data[0].song3.album,
          response.data[0].song4.album,
          response.data[0].song5.album,
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
          songName={songName}
          songArtist={songArtist}
          songAlbum={songAlbum}
          displayName={props.displayName}
          userId={props.userId}
          upvoteId={props.upvoteId}
          upvoteCount={props.upvoteCount}
          isExplorePage={props.isExplorePage}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function Leaderboard(props) {
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
  const rankLabels = ["1st Place", "2nd Place", "3rd Place"];

  return (
    <>
      {users.slice(0, 3).map((user, index) => (
        <>
          <br></br>
          <div key={index}>
            <div class="exploreText">
              {" "}
              {index < rankLabels.length ? `${rankLabels[index]}:` : ""}
              {" " + user.displayName}
            </div>
            <Profile
              userId={user.userId}
              upvoteId={props.upvoteId}
              upvoteCount={user.upvoteCount}
              isExplorePage={true}
            />
          </div>
        </>
      ))}
    </>
  );
}

function Homepage({ userData }) {
  const [token, setToken] = useState(userData.token);
  const [homePage, setHomePage] = useState(true);
  const [leaderboard, setLeaderboard] = useState(true);

  const goToExplore = () => {
    setHomePage(false);
    setLeaderboard(false);
  };
  const goToLeaderboard = () => {
    setHomePage(false);
    setLeaderboard(true);
  };
  const goToProfile = () => {
    setHomePage(true);
    setLeaderboard(false);
  };

  const logOut = () => {
    window.location.reload(true);
  };

  return (
    <>
      <div className="background">
        <h1>Hello {userData.displayName}!</h1>

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
          onClick={goToLeaderboard}
        >
          <p className="text">Leaderboard</p>
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1,
            backgroundColor: "#66dd67",
          }}
          whileTap={{ scale: 0.9 }}
          className="logOutButton"
          onClick={logOut}
        >
          <p className="text">Log-out</p>
        </motion.div>

        {homePage ? (
          <Profile
            userId={userData.userId}
            upvoteId={userData.userId}
            isExplorePage={false}
          />
        ) : leaderboard ? (
          <Leaderboard
            userId={userData.userId}
            upvoteId={userData.userId}
            isExplorePage={false}
          />
        ) : (
          <ExplorePage upvoteId={userData.userId} />
        )}
      </div>
    </>
  );
}

export default Homepage;
