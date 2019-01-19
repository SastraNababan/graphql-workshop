import React from 'react';

const Heart = ({ active = false, onClick }) => (
  <svg viewBox="0 0 30 30" width="40" height="40" onClick={onClick}>
    <path
      fill={active ? 'red' : 'transparent'}
      stroke="red"
      strokeWidth={1.5}
      d="M23.48 7.9a5.1 5.1 0 0 0-7.39 0l-1 1-1-1a5.1 5.1 0 0 0-7.39 0 5.53 5.53 0 0 0 0 7.64l1 1 7.39 7.64 7.39-7.64 1-1a5.53 5.53 0 0 0 0-7.64z"
    />
  </svg>
);

export default Heart;
