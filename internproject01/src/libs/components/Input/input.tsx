import React from "react";

interface InputFiledProps {
  label: string;
  placeholder?: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email" | "number" | "file";
}

export const InputFiled: React.FC<InputFiledProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
    />
  </div>
);
