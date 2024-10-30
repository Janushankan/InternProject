import React, { useState } from "react";
import { Button } from "@/libs/components/button";
import { MovieForm } from "../../../app/_components/movieForm";
import { IMovie } from "@/libs/types";

interface ModalProps {
  type: "add" | "edit" | "delete";
  onClose: () => void;
  children?: React.ReactNode;
}



export const Modal: React.FC<ModalProps> = ({ type, onClose ,children}) => {



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



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{getTitle()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">✕</button>
        </div>

       {children}
      </div>
    </div>
  );
};
