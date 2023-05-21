// import React, { useState } from 'react';

// function TodoList() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [editedTask, setEditedTask] = useState('');
//   const [editMode, setEditMode] = useState(false);

//   const addTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, newTask]);
//       setNewTask('');
//     }
//   };

//   const editTask = (taskIndex) => {
//     setEditedTask(tasks[taskIndex]);
//     setEditMode(true);
//   };

//   const updateTask = () => {
//     if (editedTask.trim() !== '') {
//       const updatedTasks = [...tasks];
//       updatedTasks.splice(tasks.indexOf(editedTask), 1, editedTask);
//       setTasks(updatedTasks);
//       setEditedTask('');
//       setEditMode(false);
//     }
//   };

//   const deleteTask = (taskIndex) => {
//     const updatedTasks = [...tasks];
//     updatedTasks.splice(taskIndex, 1);
//     setTasks(updatedTasks);
//   };

//   const sortTasks = () => {
//     const sortedTasks = [...tasks].sort();
//     setTasks(sortedTasks);
//   };

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
//       <h1 style={{ fontSize: '28px', margin: '20px 0' }}>Todo List</h1>
//       <div style={{ marginBottom: '10px' }}>
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Enter a new task"
//           style={{ padding: '6px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
//         />
//         <button onClick={addTask} style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', border: 'none' }}>Add Task</button>
//       </div>
//       <ul style={{ listStyleType: 'none', padding: '0' }}>
//         {tasks.map((task, index) => (
//           <li key={index} style={{ margin: '5px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <span style={{ flex: '1' }}>{task}</span>
//             <button onClick={() => editTask(index)} style={{ margin: '0 5px', padding: '4px 8px', backgroundColor: '#2196F3', color: '#fff', border: 'none', cursor: 'pointer' }}>Edit</button>
//             <button onClick={() => deleteTask(index)} style={{ margin: '0 5px', padding: '4px 8px', backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer' }}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div style={{ marginTop: '10px' }}>
//         {editMode ? (
//           <>
//             <input
//               type="text"
//               value={editedTask}
//               onChange={(e) => setEditedTask(e.target.value)}
//               placeholder="Edit task"
//               style={{ padding: '6px', marginRight: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
//             />
//             <button onClick={updateTask} style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', border: 'none' }}>Update Task</button>
//           </>
//         ) : (
//           <button onClick={sortTasks} style={{ padding: '6px 12px', borderRadius: '4px', backgroundColor: '#FF9800', color: '#fff', border: 'none' }}>Sort Tasks</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TodoList;
