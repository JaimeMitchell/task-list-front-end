import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

// aria notes: displays tasks from back end, but toggle does not update in back end yet.
const kBaseUrl = 'http://localhost:5000';

const convertFromApi = (apiTask) => {
  const { description, id, is_complete: isComplete, title } = apiTask;

  const newTask = { description, id, isComplete, title };
  return newTask;
};

const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}/tasks`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((err) => {
      console.log(err);
    });
};

const App = () => {
  // const [tasks, setTasks] = useState(TASKS);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi().then((tasks) => {
      console.log(tasks);
      setTasks(tasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleButton = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      })
    );
  };

  // const deleteButton = (id) => {
  //   setTasks((tasks) =>
  //     tasks.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, id: !task.id, title: !task.title };
  //       } else {
  //         return task;
  //       }
  //     })
  //   );
  // };

  const deleteButton = (id) => {
    setTasks((tasks) =>
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  // const toggleButton = () => {
  //   () => setTasks(!tasks);
  // };
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
              toggleButton={toggleButton}
              deleteButton={deleteButton}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
