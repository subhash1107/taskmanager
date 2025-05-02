import React from 'react';

const Input = ({ label, register, required, type = 'text', placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        {...register(label, { required })}
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
    </div>
  );
};

export default Input;
