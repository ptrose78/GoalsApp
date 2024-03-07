
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
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Data inserted successfully" });
    });
});

app.get('/goals', async (req, res) => {
    console.log('bye')
    try {
      const sql = "SELECT * FROM goalgetter.goals"; 
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error fetching goals:", err);
          return res.status(500).json({ error: "Error fetching goals" });
        }
        console.log(result)
        return res.status(200).json(result); 
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Error fetching goals" });
    }
  });

app.listen(4000, () => {
    console.log("listening")
})

