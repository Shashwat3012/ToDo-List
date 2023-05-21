import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  // const [sortOrder, setSortOrder] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    //     //   response.data.forEach(data => {
    //     //     setTasks([...tasks, data]);
    //     //    // setTasks(data);
    //     //   });

    await axios.get("http://localhost:3001/api/todo-app");
    try {
      await axios.get("http://localhost:3001/api/todo-app").then((response) => {
        setTasks([...response.data]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      await axios.post("http://localhost:3001/api/todo-app", { text: newTask });
      fetchTodos();
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (id) => {
    //tasks.filter(t => t.id)
    console.log(tasks.filter((t) => t.id == id).at(0));
    setEditedTask(tasks.filter((t) => t.id == id).at(0));
    setEditMode(true);
    console.log(editedTask);
    // try {
    //   await axios.post('http://localhost:3001/api/todo-app', { "text": "newTodo" });
    //   fetchTodos();
    //   setNewTask('');
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const updateTask = async (id, task) => {
    try {
      console.log(editedTask);
      console.log(id);
      console.log(task);
      //await axios.put('http://localhost:3001/api/todo-app/{id}',);
      fetchTodos();
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  const sortTasks = async () => {
    // if(sortOrder){
    const strAscending = [...tasks].sort((a, b) =>
    a.task > b.task ? 1 : -1,
  );
    // const sortedTasks = [...tasks].sort();
    setTasks(strAscending);
    
    // }else{
    //   const strDescending = [...tasks].sort((a, b) =>
    //   a.task > b.task ? -1 : 1,
    // );
    // setTasks(strDescending);
    // }
    // setSortOrder(!sortOrder)
  };

  const deleteTask = async (id) => {
    try {
      console.log(id)
      await axios.delete(`http://localhost:3001/api/todo-app/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  //   return (
  //     <div>
  //       <h1>To-Do List</h1>
  //       <ul>
  //         {todos.map((todo) => (
  //           <li key={todo._id}>
  //             {todo.text}
  //             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
  //           </li>
  //         ))}
  //       </ul>
  //       <input
  //         type="text"
  //         value={newTodo}
  //         onChange={(e) => setNewTodo(e.target.value)}
  //       />
  //       <button onClick={addTodo}>Add</button>
  //     </div>
  //   );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", margin: "20px 0" }}>Todo List</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: "6px",
            marginRight: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
          }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {tasks.map((taskObj, index) => (
          <li
            key={index}
            style={{
              margin: "5px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ flex: "1" }}>{taskObj.id}</span>
            <span style={{ flex: "1" }}>{taskObj.task}</span>
            <span style={{ flex: "1" }}>{taskObj.added_time}</span>
            <button
              onClick={() => deleteTask(taskObj.id)}
              style={{
                margin: "0 5px",
                padding: "4px 8px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "10px" }}>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              placeholder="Edit task"
              style={{
                padding: "6px",
                marginRight: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={updateTask(editedTask.id, editedTask.task)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
              }}
            >
              Update Task
            </button>
          </>
        ) : (
          <div>
          <button
            onClick={()=> setTasks([...tasks].sort((a, b) =>
              a.task > b.task ? 1 : -1,
            ))}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              backgroundColor: "#FF9800",
              color: "#fff",
              border: "none",
            }}
          >
            Sort Ascending
          </button>
          <button
            onClick={()=> setTasks([...tasks].sort((a, b) =>
              a.task > b.task ? -1 : 1,
            ))}
            style={{
              padding: "6px 12px",
              margin: "2px",
              borderRadius: "4px",
              backgroundColor: "#FF9800",
              color: "#fff",
              border: "none",
            }}
          >
            Sort Descending
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
