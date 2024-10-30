import React from "react";

interface FileInputProps {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      onChange={onChange}
      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-500 file:text-white hover:file:bg-pink-600"
    />
  </div>
);
