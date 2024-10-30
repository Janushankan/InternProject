'use client'
import React, { useState } from 'react';
import { Button } from "@/libs/components/button";
import { SearchBox } from "@/libs/components/searchBox";
import { MovieCard } from "./_components/card/card";
import { Modal } from "@/libs/components/modal/modal";

const movieData = [
  {
    id: 1,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 3,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 4,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 5,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 6,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 7,
    title: "Captain Marvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
];

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleAddMovie = () => {
    setModalOpen(false);
  };

  return (
    <div className="m-12">
      <div className="flex justify-between items-center mb-5">
        <div className="w-full max-w-md">
          <SearchBox />
        </div>
        <Button text="New" variant="customPink" onClick={handleOpenModal} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movieData.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              title={movie.title}
              releaseYear={movie.releaseYear}
              duration={movie.duration}
              thumbnail={movie.thumbnail}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          type="add"
          onClose={handleCloseModal}
          onSubmit={handleAddMovie}
        />
      )}
    </div>
  );
}