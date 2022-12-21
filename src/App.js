import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

const kBaseUrl = 'http://127.0.0.1:5000';

const taskApiToJson = (task) => {
  const { description, id, is_complete: isComplete, title } = task;
  return { description, id, isComplete, title };
};

const getTasks = async () => {
  try {
    const response = await axios.get(`${kBaseUrl}/tasks`);
    return response.data.map(taskApiToJson);
  } catch (err) {
    console.log(err);
    throw new Error('error fetching tasks');
  }
};

// function getTasks() {
//   return axios
//     .get(`${kBaseUrl}/tasks`)
//     .then((response) => {
//       return response.data.map(taskApiToJson);
//     })
//     .catch((error) => console.log(error));
// }

const updateTask = async (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  try {
    const response = axios.patch(`${kBaseUrl}/tasks/${endpoint}`);
    //why no 'await' with this async?
    return taskApiToJson(response.data.task);
  } catch (error) {
    console.log(error);
    //why id here but not anywhere in endpoint above???
    throw new Error(`error updating task ${id}`);
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`${kBaseUrl}/tasks/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error(`error deleting task ${id}`);
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      // why 'error.message' here and not elsewhere.
      //Why no 'new Error()'
      console.log(error.message);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const updateTask = async (id) => {
    const task = task.find((task) => task.id === id);

    if (!task) {
      return;
    }

    try {
      const newTask = await updateTask(id, !task.isComplete);

      setTasks((oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteButton = async (id) => {
    try {
      await deleteTask(id);
      setTasks((oldTasks) => {
        return oldTasks.filter((task) => task.id !== id);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              toggleButton={updateTask}
              deleteButton={deleteButton}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
