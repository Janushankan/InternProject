import React from "react";
import { Button } from "@/libs/components/button";
import { TextInput } from "@/libs/components/textInput/textInput";
import { TextArea } from "@/libs/components/textArea/textArea";
import { NumberInput } from "@/libs/components/numberInput/numberInput";
import { FileInput } from "@/libs/components/fileInput/fileInput";

interface ModalProps {
  type: "add" | "edit" | "delete";
  onClose: () => void;
  onSubmit: () => void;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose, onSubmit }) => {
  const getTitle = () => {
    switch (type) {
      case "add":
        return "Add Movies";
      case "edit":
        return "Edit Movies";
      case "delete":
        return "Delete Movies";
      default:
        return "";
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">✕</button>
        </div>

        <div className="overflow-y-auto max-h-80 px-2">
          <form className="space-y-4">
            <TextInput label="Movie Name" placeholder="Enter movie name" />
            <TextArea label="Description" rows={3} />
            <NumberInput label="Release Year" placeholder="e.g., 2021" min={1900} max={currentYear} />
            <NumberInput label="Movie Duration (minutes)" placeholder="e.g., 120" min={0} />
            <FileInput label="Thumbnail Image" />
          </form>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button text="Cancel" onClick={onClose} variant="secondary" />
          {type === "add" && <Button text="Add" onClick={onSubmit} variant="customPink" />}
          {type === "edit" && <Button text="Update" onClick={onSubmit} variant="customPink" />}
          {type === "delete" && <Button text="Delete" onClick={onSubmit} variant="customPink" />}
        </div>
      </div>
    </div>
  );
};
