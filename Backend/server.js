
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
    const { goalId, name, date, note, taskId } = req.body; 
    console.log(goalId)
  
    const sql = "INSERT INTO goalgetter.goals (goalId, name, date, note, taskId) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [goalId, name, date, note, taskId], (err, result) => {
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
        //console.log(result)
        return res.status(200).json(result); 
      });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching goals" });
    }
  });

  app.delete('/goals/delete', async (req, res) => {
    const { goalId } = req.query;
    console.log(goalId) 
 
    try {
      const sql = "DELETE FROM goalgetter.goals WHERE goalId = ?"; 
      db.query(sql, [goalId], (err, result) => {
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
    const { goalId, taskId } = req.body;
  
    const sql = "UPDATE goalgetter.goals SET taskId = CONCAT(IFNULL(taskId, ''), ?, ', ') WHERE goalId = ?";

    db.query(sql, [taskId, goalId], (err, result) => {
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
    const {goalId, taskId} = req.body;

    const sql = "INSERT INTO goalgetter.goal_tasks (goalId, taskId) VALUES (?, ?);"
    db.query(sql, [goalId, taskId], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({message: "Data inserted successfully"});
    })
  })

  app.get('/tasks/fetch', (req, res) => {
    console.log(req.query)
    const { goalId } = req.query;
    console.log(goalId)
    
    const sql = "SELECT tasks.* FROM tasks JOIN goal_tasks ON tasks.id = goal_tasks.taskId WHERE goal_tasks.goalId = ?";
    db.query(sql, [goalId], (err, result) => {
      if (err) {
        console.log("error fetching tasks")
        return res.status(500).json({ error: "Error fetching tasks" });
      }
      console.log('fetchTasks') 
      console.log(result)
      return res.status(200).json(result);
    })
  })

app.listen(4000, () => {
    console.log("listening")
})

