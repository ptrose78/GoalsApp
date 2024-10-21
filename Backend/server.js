
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
    console.log(req.body)
  
    const sql = "INSERT INTO goalgetter.goals (goalId, name, date, note, taskId) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [goalId, name, date, note, taskId], (err, result) => {
        if (err) {
            return res.json(err);
        }
        console.log(err)
        console.log(result)
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
        return res.status(200).json(result); 
      });
    } catch (error) {
      return res.status(500).json({ error: "Error fetching goals" });
    }
  });

  app.delete('/goals/delete', async (req, res) => {
    const { goalId } = req.query;
    console.log(goalId) 
    console.log('added code')
 
    try {
      const sqlCommands = [
          "DELETE goalgetter.tasks FROM goalgetter.tasks JOIN goalgetter.goal_tasks_todos ON goalgetter.tasks.id = goalgetter.goal_tasks_todos.taskId WHERE goalgetter.goal_tasks_todos.goalId = ?",
          "DELETE goalgetter.todos FROM goalgetter.todos JOIN goalgetter.goal_tasks_todos ON goalgetter.todos.id = goalgetter.goal_tasks_todos.todoId WHERE goalgetter.goal_tasks_todos.goalId = ?",
          "DELETE FROM goalgetter.goals WHERE goalId = ?",
          "DELETE FROM goalgetter.goal_tasks_todos WHERE goalId = ?"
      ]
      
      sqlCommands.forEach(sql => {
          db.query(sql, [goalId], (err, result) => {
              if (err) {
                  console.error("Error executing:", err);
                  return res.status(500).json({ error: "Error executing" });
              }
              console.log(result);
          });
      });
  
      return res.status(200).json({ message: "Commands executed successfully" });
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});
  
app.put('/goals/addTaskId', async (req, res) => {
    const { goalId, taskId } = req.body;
  
    const sql = "UPDATE goalgetter.goals SET taskId = CONCAT(IFNULL(taskId, ''), ?, ', ') WHERE goalId = ?";

    db.query(sql, [taskId, goalId], (err, result) => {
      if (err) {
        console.error("Error updating goal:", err);
        return res.status(500).json({ error: "Error updating goal" });
      }
      console.log("Goal addTaskId successfully");
      return res.status(200).json({ message: "Goal updated successfully", taskId: taskId });
    });
  });
  
  app.put('/goals/removeTaskId', async (req, res) => {
    console.log(req.body)
    const { goalId, taskId } = req.body;
  
    const sql = "UPDATE goalgetter.goals SET taskId = TRIM(BOTH ', ' FROM REPLACE(taskId, ?, '')) WHERE goalId = ?";

    db.query(sql, [taskId, goalId], (err, result) => {
      if (err) {
        console.error("Error updating goal:", err);
        return res.status(500).json({ error: "Error updating goal" });
      }
      console.log("Goal removeTaskId successfully");
      return res.status(200).json({ message: "Goal updated successfully", taskId: taskId });
    });
  });

  app.post('/tasks/new', (req, res) => {
    const { id, name, resources, notes} = req.body;
    console.log(name)
    
    const sql = "INSERT INTO goalgetter.tasks (id, name, resources, notes) VALUES (?, ?, ?, ?)";
    db.query(sql, [id, name, resources, notes], (err, result) => {
      if (err) {
          return res.json(err);
      }
      console.log("post tasks")
      return res.json({message: "Data inserted successfully"});
    });
  })

  app.get('/tasks/fetch', (req, res) => {
    const { goalId } = req.query;
    console.log(goalId)
    
    const sql = "SELECT tasks.* FROM tasks JOIN goal_tasks_todos ON tasks.id = goal_tasks_todos.taskId WHERE goal_tasks_todos.goalId = ?";
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

  app.delete('/task/delete', (req, res) => {
    const {id} = req.query;
    console.log(id)

    try {
    const sqlCommands = ["DELETE FROM goalgetter.tasks WHERE id = ?",
    "DELETE goalgetter.todos FROM goalgetter.todos JOIN goalgetter.goal_tasks_todos ON goalgetter.todos.id = goalgetter.goal_tasks_todos.todoId WHERE goalgetter.goal_tasks_todos.taskId = ?",
    "DELETE FROM goalgetter.goal_tasks_todos WHERE taskId = ?"]

    sqlCommands.forEach(sql => {
      db.query(sql, [id], (err, result) => {
      if (err) {
        console.log("task delete fail")
        return res.status(500).json({error: "Error deleting task"})
        }
      });
    });
        return res.status(200).json({ message: "Commands executed successfully" });
    } catch (error) {
        console.log("task delete success")
        return res.status(200).json(result);
    }
  })

  app.post('/todos/new', (req, res) => {
    console.log(req.body)
    const {id, name, resources, notes, goal} = req.body;
    const sql = "INSERT INTO goalgetter.todos (id, name, resources, notes, goal) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [id, name, resources, notes, goal], (err, result) => {
      if (err) {
        console.log(err)
        console.log("failed todos")
        return res.json(err);
      }
      console.log("success")
      return res.json({message: "data inserted successfully"})
    })
  })

  app.get('/todos/fetch', (req, res) => {
    console.log("fetchTodos")
    console.log(req.body)

    const sql = "SELECT * FROM goalgetter.todos"

    db.query(sql, (err, result) => {
      try {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: "Error fetching todos" });
          }
          console.log("success todos fetch")
        return res.status(200).json(result);
      }
      catch (error) {
        return res.status(500).json({ error: "Error fetching todos" });
      }
    })
  });

  app.delete('/todo/delete', (req, res) => {
    const {id} = req.query;
    console.log(id)
    const sql = "DELETE FROM goalgetter.todos WHERE id = ?"

    db.query(sql, [id], (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: "Error deleting todos"});
        }
        console.log(result)
        return res.status(200).json(result)
      })
  })

  app.post('/tasks/ids', (req, res) => {
    const {goalId, taskId} = req.body;

    const sql = "INSERT INTO goalgetter.goal_tasks_todos (goalId, taskId) VALUES (?, ?);"
    db.query(sql, [goalId, taskId], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({message: "Data inserted successfully"});
    })
  })

  app.post('/todos/ids', (req, res) => {
    const {goalId, taskId, todoId} = req.body;

    const sql = "INSERT INTO goalgetter.goal_tasks_todos (goalId, taskId, todoId) VALUES (?, ?, ?);"
    db.query(sql, [goalId, taskId, todoId], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json({message: "Data inserted successfully"});
    })
  })

app.listen(4000, () => {
    console.log("listening")
})

