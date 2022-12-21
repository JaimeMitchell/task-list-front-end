import React, { useState } from 'react';
import './TaskForm.css';

const taskObj = {
  'title': '',
  'description': ''
}
const TaskForm = ({newFormData}) => {
  const [createTask, setCreateTask] = useState(taskObj);


  const createTaskEvent = (changeEvent) => {
    setCreateTask(changeEvent.target.value);
    console.log(
      `this is form's state: ${createTask} after onChange object Returned from input`
    );
  };

  // const describeTask = (changeEvent) => {
  //   setDescription(changeEvent.target.value);
  //   console.log(`changing Description state: ${createDescription}`);
  // };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = {...formData, [fieldName]: fieldValue}

  return (
    <section>
      <h2>Create Task</h2>
      <form>
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
      </form>
    </section>
  );
};
export default TaskForm;
