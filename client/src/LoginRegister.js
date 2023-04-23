import React, { useEffect, useState } from "react";
import Homepage from "./Homepage";
import axios from "axios";
import "./styles.css";

// Spotify token authentication from: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

function LoginRegister({ onLogin, onRegister }) {
  const CLIENT_ID = "dcac38285fb343269ed721276f19b1a9";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [finished, setFinished] = useState(false);
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    console.log("useeffect running");
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let display_name = window.localStorage.getItem("display_name");
    console.log(hash);
    if (hash && Date.now() - localStorage.getItem("timeToken") < 3599) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      //display_name = hash.substring(1).split("&").find(elem => elem.startsWith("display_name")).split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("display_name", display_name);
    }
    if (
      token != null &&
      Date.now() - localStorage.getItem("timeToken") < 3599
    ) {
      // They are logged in, do database stuff. Pull all information we need from spotify to database. token, display name, 5 song id, title, artist, album

      // CALL DatabaseAdd
      setToken(token);
      setisLogged(true);
      console.log("logged in with token: " + token);
      console.log("username: " + JSON.stringify(display_name));
    } else {
      setisLogged(false);
    }
  }, []);

  const spotifyLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&show_dialog=${true}`;
    localStorage.setItem("timeToken", Date.now());
  };

  return (
    <div className="penis">
      {isLogged ? (
        <>
          <DatabaseAdd
            token={token}
            auth={CLIENT_ID}
            onUserIdUpdate={setUserId}
            onDisplayNameUpdate={setDisplayName}
            onFinishQuery={setFinished}
          />
          {finished ? (
            <Homepage
              userData={{
                token: token,
                userId: userId,
                displayName: displayName,
              }}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <button onClick={spotifyLogin}>login to spotify</button>
        </>
      )}
    </div>
  );
}

function DatabaseAdd(props) {
  console.log("calling db add");
  //token, display name, 5 song id, title, artist, album

  let displayName = "";
  let userId = "";
  let ids = [];
  let titles = [];
  let artist = [];
  let album = [];
  let cover = [];

  const access_token = props.token;

  // This one isn't erroring !! (I think)
  useEffect(() => {
    let que = axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((response) => {
        // update the state variables here
        //setDisplayName(response.data.display_name);
        //setUserId(response.data.id);
        userId = response.data.id;
        displayName = response.data.display_name;
        props.onUserIdUpdate(userId);
        props.onDisplayNameUpdate(displayName);
      })
      .then(() => {
        let topSongs = axios
          .get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
              Authorization: `Bearer ${props.token}`,
            },
            params: {
              limit: 5,
              offset: 0,
            },
          })
          .then((response) => {
            // update the state variables here
            const tempIds = [];
            const tempTitles = [];
            const tempArtists = [];
            const tempAlbums = [];
            const tempCover = [];

            for (let i = 0; i < 5; i++) {
              tempIds.push(response.data.items[i].id);
              tempTitles.push(response.data.items[i].name);
              tempArtists.push(response.data.items[i].artists[0].name);
              tempAlbums.push(response.data.items[i].album.name);
              tempCover.push(response.data.items[i].album.images[1].url);
            }
            ids = tempIds;
            titles = tempTitles;
            artist = tempArtists;
            album = tempAlbums;
            cover = tempCover;
          })
          .then(() => {
            // nvm totally doesnt work
            console.log("client side: " + props.token);

            axios.post("http://localhost:1234/api/newUser", {
              userId: userId,
              displayName: displayName,
              songId: ids,
              songTitle: titles,
              songArtist: artist,
              songAlbum: album,
              songCover: cover,
            });
            props.onFinishQuery(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [access_token]);

  // return null since this component doesn't render anything
  return null;
}

export default LoginRegister;
