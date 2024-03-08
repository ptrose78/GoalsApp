
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
    console.log(req.body)
    const sql = "INSERT INTO goalgetter.goals (id, name, date, note) VALUES (?, ?, ?, ?)";
    db.query(sql, [id, name, date, note], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json({message: "Data inserted successfully"});
    });
});

app.post('/tasks/new', (req, res) => {
  const { id, name, resources, notes} = req.body;
  console.log(req.body)
  const sql = "INSERT INTO goalgetter.tasks (id, name, resources, notes) VALUES (?, ?, ?, ?)";
  db.query(sql, [id, name, resources, notes], (err, result) => {
    if (err) {
        return res.json(err);
    }
    console.log("post tasks")
    return res.json({message: "Data inserted successfully"});
  });
})

app.get('/goals', async (req, res) => {
    try {
      const sql = "SELECT * FROM goalgetter.goals"; 
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error fetching goals:", err);
          return res.status(500).json({ error: "Error fetching goals" });
        }
        return res.status(200).json(result); 
      });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching goals" });
    }
  });

app.delete('/goals', async (req, res) => {
  console.log(req.query)
    const { id } = req.query; 
    console.log('delete')
    console.log(req.body)
    console.log(id)
    try {
      const sql = "DELETE FROM goalgetter.goals WHERE ID = ?"; 
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Error deleting goals:", err);
          return res.status(500).json({ error: "Error deleting goals" });
        }
        console.log(id)
        //console.log(result)
        return res.status(200).json(result); 
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  });

app.listen(4000, () => {
    console.log("listening")
})

