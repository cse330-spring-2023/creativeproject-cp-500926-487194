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

app.post("/api/newuser", (req, res) => {
  // Check if the user already exists
  db.query("SELECT id FROM users WHERE id = ?", [id], (err, result) => {
    let displayName = req.body.displayName;
    let userId = req.body.userid;
    let song1 = {};
    let song2 = {};
    let song3 = {};
    let song4 = {};
    let song5 = {};
    let arr = [song1, song2, song3, song4, song5];

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

    if (err) {
      console.log(`User with ID ${id} already exists, updating information`);

      db.query(
        "INSERT INTO spotify (userId, displayName, song1, song2, song3, song4, song5) VALUES (?,?,?,?,?,?,?)",
        [userId, displayName, arr[0], arr[1], arr[2], arr[3], arr[4]],
        (err, result) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            console.log(`User with ID ${id} added to database`);
            res.sendStatus(201);
          }
        }
      );
      /*console.log(err);
        res.sendStatus(500);*/
    } else if (result.length > 0) {
      console.log("updating user info");
      db.query(
        "UPDATE spotify SET song1 = ?, song2 = ?, song3 = ?, song4 = ?, song5 = ?",
        [arr[0], arr[1], arr[2], arr[3], arr[4]],
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
  });
});

app.listen(1234, () => {
  console.log(`Server is running on 1234`);
});
