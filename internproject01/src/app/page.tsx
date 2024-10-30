"use client";
import React, { useState } from "react";
import { Button } from "@/libs/components/button";
import { SearchBox } from "@/libs/components/searchBox";
import { MovieCard } from "../libs/components/card/card";
import { Modal } from "@/libs/components/modal/modal";
import { IMovie } from "@/libs/types";
import { MovieForm } from "./_components/movieForm";

const movieData = [
  {
    id: 1,
    title: "Captain trygarvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Captain Massrtdarvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 3,
    title: "Captain Masdhsftyarvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 4,
    title: "Captain Maadfsdrvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 5,
    title: "Captain Maasddrvel",
    releaseYear: 2019,
    duration: 123,
    thumbnail:
      "https://w0.peakpx.com/wallpaper/229/75/HD-wallpaper-captain-marvel-captain-marvel-movie-poster.jpg",
  },
  {
    id: 6,
    title: "Captain Mafefwrvel",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");

  const handleOpenModal = (type: "add" | "edit" | "delete", movie: IMovie | null = null) => {
    setModalType(type);
    setCurrentMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMovie(null);
  };


console.log("Hello World",isModalOpen);


  return (
    <div className="m-12">
      <div className="flex justify-between items-center mb-5">
        <div className="w-full max-w-md">
          <SearchBox />
        </div>
        <Button
          text="Add"
          variant="customPink"
          onClick={() => handleOpenModal("add")}
          icon
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movieData?.map((movie) => (
          <div key={movie?.id}>
            <MovieCard
              title={movie?.title}
              releaseYear={movie?.releaseYear}
              duration={movie.duration}
              thumbnail={movie.thumbnail}
              onEdit={() => handleOpenModal("edit", movie)}
              // onDelete={() => handleOpenModal("delete", movie)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          type={modalType}
          onClose={handleCloseModal}
        >
          <MovieForm movieData={currentMovie} type={modalType}/>
        </Modal>
      )}
    </div>
  );
}
