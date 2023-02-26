import React, { Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo'
const ListTodos = () => {

  const [todos, setTodos] = useState([]);

  const getTodos = async e => {
    const res = await fetch("http://localhost:5000/todos");
    const todoarray = await res.json();
    console.log(todoarray);
    setTodos(todoarray);
  };
  useEffect(() => {
    getTodos();
  }, [])


  async function deletetodo(id) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      })

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.log(err.message)

    }
  }




  return (
    <Fragment>
      <table class="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/*<tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}

        {
          todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo}/></td>
              <td><button type="button" className="btn-btn-danger" onClick={() => deletetodo(todo.todo_id)}>Delete</button></td>
            </tr>
          ))
        }
        <tbody>
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListTodos;