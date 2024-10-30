import React from "react";

interface NumberInputProps {
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, placeholder, min, max, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      placeholder={placeholder}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
    />
  </div>
);
