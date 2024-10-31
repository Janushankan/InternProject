"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/libs/components/button";
import { SearchBox } from "@/libs/components/searchBox";
import { MovieCard } from "../libs/components/card/card";
import { Modal } from "@/libs/components/modal/modal";
import { IMovie } from "@/libs/types";
import { MovieForm } from "./_components/movieForm";
import { deleteMovie, getMoviesDetails } from "@/services";
import { useMoviesStore } from "@/store";
import ConfirmationModal from "@/libs/components/conformationModal/conformationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
  const [modalType, setModalType] = useState<"add" | "edit" | "delete">("add");
  const { movies, setMoviesAction } = useMoviesStore();
  const [movieToDelete, setMovieToDelete] = useState<IMovie | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleOpenModal = (
    type: "add" | "edit" | "delete",
    movie: IMovie | null = null
  ) => {
    setModalType(type);
    setCurrentMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMovie(null);
  };

  const handleOpenConfirmDelete = (movie: IMovie) => {
    setMovieToDelete(movie);
    setIsConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
    setMovieToDelete(null);
  };

  const handleDelete = () => {
    if (movieToDelete && movieToDelete._id) {
      const movieId = String(movieToDelete._id);

      deleteMovie(movieId, (res) => {
        if (res?.data) {
          console.log("Movie Deleted:", res.data);
          setMoviesAction(
            movies.filter((movie) => movie._id !== movieToDelete._id)
          );
        } else {
          console.error("Failed to delete movie:", res?.statusText);
        }
      });

      handleCloseConfirmDelete();
    } else {
      console.error("No valid movie found to delete.");
    }
  };

  useEffect(() => {
    getMoviesDetails((res) => {
      if (res?.data) {
        setMoviesAction(res.data);
        console.log(res.data, "Fetched Movie Data");
      } else {
        console.error("Failed to fetch movies:", res.statusText);
      }
    });
  }, []);

  console.log("Hello World", isModalOpen);

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
        {movies?.map((movie, index) => (
          <div key={index}>
            <MovieCard
              title={movie?.title || ""}
              releaseYear={movie?.releaseYear || 0}
              duration={movie.duration || 0}
              thumbnail={movie.thumbnail || ""}
              onEdit={() => handleOpenModal("edit", movie)}
              onDelete={() => handleOpenConfirmDelete(movie)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal type={modalType} onClose={handleCloseModal}>
          <MovieForm movieData={currentMovie} type={modalType} />
        </Modal>
      )}

      <ConfirmationModal
        message={`Are you sure you want to delete "${movieToDelete?.title}"?`}
        onConfirm={handleDelete}
        onCancel={handleCloseConfirmDelete}
        isOpen={isConfirmDeleteOpen}
      />
    </div>
  );
}
