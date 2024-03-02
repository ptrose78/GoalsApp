
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

app.use(bodyParser.json());

app.post('/goals/new', (req, res) => {
    const { id, name, date, note } = req.body; 
  
    const sql = "INSERT INTO goalgetter.goals (id, name, date, note) VALUES (?, ?, ?, ?)";
    db.query(sql, [id, name, date, note], (err, result) => {
        console.log(req.body)
        console.log('inside sql query')
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Data inserted successfully" });
    });
});

app.listen(8081, () => {
    console.log("listening")
})

