import React from "react";
const Input = ({ className, name, type, placeholder, func, value }) => {
  return (
    <input
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={func}
      value={value}
    />
  );
};

export default Input;
