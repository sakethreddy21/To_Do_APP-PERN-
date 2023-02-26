const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.text());
//Routes

//get all todos

app.get("/todos", async (req, res)=>{
  try {
    const alltodos= await pool.query("SELECT * FROM todo");

    res.json(alltodos.rows);
  } catch (err) {
    console.log(err.messgae)
    
  }
})

//get a todo
app.get("/todos/:id", async (req, res)=>{
  try {
    const {id}= req.params;
    const todo= await pool.query(" SELECT * FROM todo WHERE todo_id = $1", [id]);

    res.json(todo.rows);
  } catch (err) {
    console.log(err.messgae)
    
  }
})
//create a todo

app.post("/todos", async (req,res)=>{
  try {
    const { description }= req.body;
    const newtodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
    res.json(newtodo.rows[0]);
  } catch (err) {
    console.log(err.messgae)
    
  }
})

//update a todo
app.put("/todos/:id", async(req, res)=>{
  try {
    const {id}= req.params;
    const {description} = req.body;
    const updatetodo= await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
    res.json(updatetodo.rows);
  } catch (err) {
    console.log(err.messgae);
  }

})
//delete a todo

app.delete("/todos/:id", async (req, res)=>{
  try {
    const {id}= req.params;
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
    res.json("row deleted");
  } catch (err) {
    console.log(err.messgae)
    
  }
})

app.listen(5000, ()=>{
  console.log("Server is starting")
})