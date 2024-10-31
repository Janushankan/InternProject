import React from "react";
import { Button } from "@/libs/components/button";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirmation
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button text="Cancel" onClick={onCancel} variant="secondary" />
          <Button text="Confirm" onClick={onConfirm} variant="customPink" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
