import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  rows = 3,
  value,
  onChange,
  name,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-300 focus:border-pink-300 sm:text-sm"
    />
    <div className="text-red-500 text-xs">{error}</div>
  </div>
);
