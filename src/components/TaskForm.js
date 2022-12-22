import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

const taskObj = {
  title: '',
  description: '',
};
const TaskForm = ({ handleFormSubmit }) => {
  const [createTask, setCreateTask] = useState(taskObj);

  // const createTaskEvent = (changeEvent) => {
  //   setCreateTask(changeEvent.target.value);
  //   console.log(
  //     `this is form's state: ${createTask} after onChange object Returned from input`
  //   );
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(createTask);
    handleFormSubmit(createTask);
    setCreateTask(taskObj);
  };
  // const describeTask = (changeEvent) => {
  //   setDescription(changeEvent.target.value);
  //   console.log(`changing Description state: ${createDescription}`);
  // };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newCreateTask = { ...createTask, [fieldName]: fieldValue };

    setCreateTask(newCreateTask);
  };

  return (
    <section>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          placeholder="Create Task"
          id="title"
          name="title"
          value={createTask.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          name="description"
          value={createTask.description}
          onChange={handleChange}
        />
        <div>
          <input type="submit" value="Add Task" />
        </div>
      </form>
    </section>
  );
};

TaskForm.propTypes = {
  handleFormSubmit: PropTypes.func,
};
export default TaskForm;
