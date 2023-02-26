import React, {Fragment, useState} from "react";
const InputTodos=()=>{
  const [description, setDescription] = useState("");

  console.log(description);
const onSubmitform=async  e=>{
  try {
    const body= {description};
    const response = await fetch("http://localhost:5000/todos", {
      method:"Post",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(body)
    });
    console.log(response);
  } catch (err) {
    console.error(err.message)
    
  }

};

  return(
    <Fragment>
    <h1 className="text-center my-5">Input Todo</h1>
    <form className="d-flex" onSubmit={onSubmitform}>
    <input  type="text" placeholder="add todo" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
    <button className="btn-btn-success">Add</button>
    </form>
    </Fragment>
  )
}
export default InputTodos;