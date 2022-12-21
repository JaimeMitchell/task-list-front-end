import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList.js';
import './App.css';
import axios from 'axios';

const kBaseUrl = 'http://localhost:5000';

const taskApiToJson = (task) => {
  const { description, id, is_complete: isComplete, title } = task;

  return { description, id, isComplete, title };
};

const getTasksAsync = async () => {
  try {
    const response = await axios.get(`${kBaseUrl}/tasks`);
    return response.data.map(taskApiToJson);
  } catch (err) {
    console.log(err);
    throw new Error('error fetching tasks');
  }
};

const updateTaskAsync = async (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  try {
    const response = await axios.patch(`${kBaseUrl}/tasks/${id}/${endpoint}`);
    return taskApiToJson(response.data.task);
  } catch (err) {
    console.log(err);
    throw new Error(`error updating task ${id}`);
  }
};

const deleteTaskAsync = async (id) => {
  try {
    await axios.delete(`${kBaseUrl}/tasks/${id}`);
  } catch (err) {
    console.log(err);
    throw new Error(`error deleting task ${id}`);
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      const tasks = await getTasksAsync();
      setTasks(tasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateTask = async (id) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return;
    }

    try {
      const newTask = await updateTaskAsync(id, !task.isComplete);

      setTasks((oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAsync(id);

      setTasks((oldTasks) => {
        return oldTasks.filter((task) => task.id !== id);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleCompleteCallback={updateTask}
            onDeleteCallback={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
