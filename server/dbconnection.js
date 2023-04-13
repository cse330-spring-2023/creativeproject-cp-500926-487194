


const mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "16brc8873",
    database: "330creative"
  });

  module.exports = db;





/*
  app.post('/api/create', (req,res)=> {

    const username = req.body.userName;
    const title = req.body.title;
    const text = req.body.text;
    
    db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   })

*/




