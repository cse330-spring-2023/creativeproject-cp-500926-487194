const express = require("express");
const app = express();
const db = require("./dbconnection");
const router = express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());

//app.use('/api/dbconnection', db);

app.get("/api/dbconnection", (req, res) => {
  res.send("hello world from express");
});

/*app.get("/api/get", (req,res)=> {
    // Get everything from users
    db.query("SELECT * FROM users", function(err, result){
        if (err) throw err;
        console.log(result);
        res.json(result);
    })
});*/

app.post("/api/getUser", (req, res) => {
  let userId = req.body.userId;
  console.log("SERVERSIDE ID: " + userId);
  db.query("SELECT * FROM users WHERE userId = ?", [userId]).then(
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log("Successfully pulled database");
        res.json(result);
        res.sendStatus(200);
      }
    }
  );
});

app.post("/api/getAllUsers", (req, res) => {
  let userId = req.body.userId;
  db.query("SELECT * FROM users WHERE").then((err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("Successfully pulled database");
      res.json(result);
      res.sendStatus(200);
    }
  });
});

app.post("/api/getUserMostUpvotes", (req, res) => {});

app.post("/api/getUpvotesOfUser", (req, res) => {});

app.post("/api/newUser", (req, res) => {
  // Check if the user already exists
  let displayName = req.body.displayName;
  let userId = req.body.userId;
  let song1 = {};
  let song2 = {};
  let song3 = {};
  let song4 = {};
  let song5 = {};
  let arr = [song1, song2, song3, song4, song5];

  let userExists = false;

  if (
    req.body.songId &&
    req.body.songTitle &&
    req.body.songArtist &&
    req.body.songAlbum &&
    req.body.songId.length > 0 &&
    req.body.songTitle.length > 0 &&
    req.body.songArtist.length > 0 &&
    req.body.songAlbum.length > 0
  ) {
    for (let i = 0; i < 5; i++) {
      arr[i] = {
        songId: req.body.songId[i],
        songTitle: req.body.songTitle[i],
        artist: req.body.songArtist[i],
        album: req.body.songAlbum[i],
      };
    }
  } else {
    console.log("songs be empty");
  }

  const controller = new AbortController();

  db.query(
    "SELECT userId FROM users WHERE userId = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(
          `User with ID ${userId} doesnt exists, inserting information`
        );
      } else {
        console.log("User does exist, updating info");
        userExists = true;
      }
      controller.abort();

      if (!userExists) {
        console.log("inserting.....");
        db.query(
          "INSERT INTO users (userId, displayName, song1, song2, song3, song4, song5) VALUES (?,?,?,?,?,?,?)",
          [
            userId,
            displayName,
            JSON.stringify(arr[0]),
            JSON.stringify(arr[1]),
            JSON.stringify(arr[2]),
            JSON.stringify(arr[3]),
            JSON.stringify(arr[4]),
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              console.log(`User with ID ${userId} added to database`);
              res.sendStatus(201);
            }
          }
        );
      } else if (result.length > 0) {
        console.log("updating user info");
        db.query(
          "UPDATE users SET song1 = ?, song2 = ?, song3 = ?, song4 = ?, song5 = ?",
          [
            JSON.stringify(arr[0]),
            JSON.stringify(arr[1]),
            JSON.stringify(arr[2]),
            JSON.stringify(arr[3]),
            JSON.stringify(arr[4]),
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              console.log("Successfully updated database");
              res.sendStatus(201);
            }
          }
        );
      }
    }
  );
});

app.listen(1234, () => {
  console.log(`Server is running on 1234`);
});
