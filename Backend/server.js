
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
    const { id, name, date, note, taskId } = req.body; 
  
    const sql = "INSERT INTO goalgetter.goals (id, name, date, note, taskId) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [id, name, date, note, taskId], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json({message: "Data inserted successfully"});
    });
  });

  app.get('/goals/fetch', async (req, res) => {
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
      return res.status(500).json({ error: "Error fetching goals" });
    }
  });

  app.delete('/goals/delete', async (req, res) => {
    const { id } = req.query; 
 
    try {
      const sql = "DELETE FROM goalgetter.goals WHERE ID = ?"; 
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Error deleting goals:", err);
          return res.status(500).json({ error: "Error deleting goals" });
        }
        return res.status(200).json(result); 
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  });
  
  app.put('/goals/update', async (req, res) => {
    const { id, taskId } = req.body;
  
    const sql = "UPDATE goalgetter.goals SET taskId = CONCAT(IFNULL(taskId, ''), ?, ', ') WHERE id = ?";

    db.query(sql, [taskId, id], (err, result) => {
      if (err) {
        console.error("Error updating goal:", err);
        return res.status(500).json({ error: "Error updating goal" });
      }
      console.log("Goal updated successfully");
      return res.status(200).json({ message: "Goal updated successfully", taskId: taskId });
    });
  });

  app.post('/tasks/new', (req, res) => {
    const { id, name, resources, notes} = req.body;
    
    const sql = "INSERT INTO goalgetter.tasks (id, name, resources, notes) VALUES (?, ?, ?, ?)";
    db.query(sql, [id, name, resources, notes], (err, result) => {
      if (err) {
          return res.json(err);
      }
      console.log("post tasks")
      return res.json({message: "Data inserted successfully"});
    });
  })

  app.post('/tasks/ids', (req, res) => {
    const {id, taskId} = req.body;

    const sql = "INSERT INTO goalgetter.goal_tasks (id, taskId) VALUES (?, ?);"
    db.query(sql, [id, taskId], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({message: "Data inserted successfully"});
    })
  })

app.listen(4000, () => {
    console.log("listening")
})

