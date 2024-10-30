import React from "react";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  releaseYear: number;
  duration: number;
  thumbnail: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  releaseYear,
  duration,
  thumbnail,
}) => {
  return (
    <div className="w-full rounded-xl">
      <div className="w-full">
        <div className="relative h-60">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={`${title} thumbnail`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          ) : (
            <div className="bg-gray-300 flex items-center justify-center h-full">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="p-4">
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
    </div>
  );
};
