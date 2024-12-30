import React from "react";

interface InputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  type?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  handleChange,
  value,
  type = "text",
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        className="border border-stone-300 rounded-md p-3 max-w-[300px]"
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
