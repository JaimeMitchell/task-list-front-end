import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  //function to change css
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  const buttonRemove = props.id ? 'tasks__item__remove ' : '';
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.toggleButton(props.id)}
      >
        {`${props.id} ${props.title}`}
      </button>

      <button
        className={`"button "${buttonRemove}`}
        onClick={() => props.deleteButton(props.id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleButton: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
};

export default Task;
