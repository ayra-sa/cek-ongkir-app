import React from "react";

interface SelectProps {
  id: string;
  label: string;
  name: string;
  data: {
    name: string;
    value: string;
  }[];
  value: string
  disabled?: boolean
  loading?: boolean
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ name, data, id, loading = false, disabled, label, handleChange,value }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id}>{label}</label>
      <select name={name} id={id} value={value} onChange={handleChange} className={`border border-stone-300 rounded-md p-3 w-[300px] ${disabled ? "cursor-not-allowed" : "cursor-default"}`} disabled={disabled}>
        <option value="">{loading ? "Loading.." : "Pilih"}</option>
        {data.map((item, id) => (
          <option key={id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
