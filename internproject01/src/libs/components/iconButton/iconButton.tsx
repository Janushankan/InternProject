import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      {icon}
    </button>
  );
};
