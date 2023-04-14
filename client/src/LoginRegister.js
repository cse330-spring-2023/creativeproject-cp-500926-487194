import React, { useEffect, useState } from "react";
import Homepage from "./Homepage";
import axios from "axios";

// Spotify token authentication from: https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

function LoginRegister({ onLogin, onRegister }) {
  const CLIENT_ID = "dcac38285fb343269ed721276f19b1a9";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";

  const [token, setToken] = useState("");
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    console.log("useeffect running");
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    let display_name = window.localStorage.getItem("display_name");
    if (hash && Date.now() - localStorage.getItem("timeToken") > 3599) {
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

      const handleDatabaseAdd = () => {
        return (
          <>
            <DatabaseAdd token={token} auth={CLIENT_ID} />
          </>
        );
      };
      handleDatabaseAdd();
    } else {
      setisLogged(false);
    }
  }, []);

  const spotifyLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    localStorage.setItem("timeToken", Date.now());
  };

  return (
    <>
      {isLogged ? (
        <>
          <Homepage userData={{ id: token }} />
        </>
      ) : (
        <>
          <button onClick={spotifyLogin}>login to spotify</button>
        </>
      )}
    </>
  );
}

function DatabaseAdd(props) {
  console.log("calling db add: " + props.token);
  //token, display name, 5 song id, title, artist, album
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [ids, setIds] = useState([]);
  const [titles, setTitles] = useState([]);
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);

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
        Promise.all([
          setDisplayName(response.data.display_name),
          setUserId(response.data.id),
        ]);
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
            const ids = [];
            const titles = [];
            const artists = [];
            const albums = [];

            for (let i = 0; i < 5; i++) {
              ids.push(response.data.items[i].id);
              titles.push(response.data.items[i].name);
              artists.push(response.data.items[i].artists[0].name);
              albums.push(response.data.items[i].album.name);
            }

            Promise.all([
              setIds(ids),
              setTitles(titles),
              setArtist(artists),
              setAlbum(albums),
            ]);
          })
          .then(() => {
            // nvm totally doesnt work
            console.log("second");
            console.log("client side: " + props.token);
            axios.post("http://localhost:1234/api/newuser", {
              userId: userId,
              displayName: displayName,
              songId: ids,
              songTitle: titles,
              songArtist: artist,
              songAlbum: album,
            });
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
