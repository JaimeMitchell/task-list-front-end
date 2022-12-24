import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = (props) => {
    return props.tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          toggleButton={props.toggleButton}
          deleteButton={props.deleteButton}
          
        />
      );
    });
  };
  return (
    <section>
      <h2>Task List</h2>
      <ul className="tasks__list no-bullet">{getTaskListJSX(props)}</ul>
    </section>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleButton: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
  
};

export default TaskList;
