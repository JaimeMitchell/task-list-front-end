import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(props.isComplete);
  // const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.toggleButton(props.id)}
      >
        {props.id}
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

// Task.propTypes = {
//   // id: PropTypes.number.isRequired,
//   // title: PropTypes.string.isRequired,
//   // isComplete: PropTypes.bool.isRequired,
//   // toggleButton: PropTypes.func.isRequired,

// };
Task.propTypes = {
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
  .isRequired,
  toggleButton: PropTypes.func.isRequired,
};

export default Task;
