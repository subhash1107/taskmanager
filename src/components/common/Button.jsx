import React from 'react';

const Button = ({ type = 'button', children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
    >
      {children}
    </button>
  );
};

export default Button;
