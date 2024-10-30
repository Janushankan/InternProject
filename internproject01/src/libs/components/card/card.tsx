import React from "react";
import Image from "next/image";
import { IconButton } from "../iconButton/iconButton";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface MovieCardProps {
  title: string;
  releaseYear: number;
  duration: number;
  thumbnail: string;
  onEdit: () => void;
  onDelete?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  releaseYear,
  duration,
  thumbnail,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-100 hover:scale-105 hover:shadow-2xl relative">
      <div className="relative h-60">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg transition-opacity duration-100"
          />
        ) : (
          <div className="bg-gray-300 flex items-center justify-center h-full rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black opacity-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-70">
          <div className="flex space-x-4">
            <IconButton
              icon={<PencilIcon className="w-6 h-6 text-blue-500" />}
              onClick={onEdit}
              ariaLabel="Edit movie"
            />
            <IconButton
              icon={<TrashIcon className="w-6 h-6 text-red-500" />}
              onClick={()=>onDelete}
              ariaLabel="Delete movie"
            />
          </div>
        </div>
      </div>
      <div className="p-4 relative z-10">
        <h3 className="text-lg font-thin truncate w-full">{title}</h3>
        <div className="flex justify-between text-gray-500 text-[15px]">
          <span>{releaseYear}</span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-1"></span>
            {duration} min
          </span>
        </div>
      </div>
    </div>
  );
};
