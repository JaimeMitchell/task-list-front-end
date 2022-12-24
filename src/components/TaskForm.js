import React, { useState } from 'react';
import './TaskForm.css';
import PropTypes from 'prop-types';

const taskObj = {
  title: '',
  description: '',
};
const TaskForm = ({ onFormSubmit }) => {
  // default values for the shape of the form and it's fields. The object being passed
  const [formData, setFormData] = useState(taskObj);

  const handleSubmit = (event) => {
    // prevents form from default browser submit
    event.preventDefault();
    //call on form submit with formData I type in the fields
    onFormSubmit(formData);
    //Resets the form fields for a new task!
    setFormData(taskObj);
  };

  // const describeTask = (changeEvent) => {
  //   setDescription(changeEvent.target.value);
  //   console.log(`changing Description state: ${createDescription}`);
  // };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
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
          value={formData.name}
          onChange={handleChange}
        />
        <input type="submit" value="Submit Task" />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </form>
    </section>
  );
};

TaskForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
