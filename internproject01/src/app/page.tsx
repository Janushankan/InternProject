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
  const [modalType, setModalType] = useState<"Add" | "Edit" | "Delete">("Add");
  const { movies, setMoviesAction } = useMoviesStore();
  const [movieToDelete, setMovieToDelete] = useState<IMovie | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);

  const handleOpenModal = (
    type: "Add" | "Edit" | "Delete",
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

  useEffect(() => {
    if (movies) {
      setMovieList(movies);
    }
  }, [movies]);

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
          console.error("Failed to Delete movie:", res?.statusText);
        }
      });

      handleCloseConfirmDelete();
    } else {
      console.error("No valid movie found to Delete.");
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

  function handleSearch(query: string) {
    let temp = [...movies];

    let list = temp.filter((movie) => {
      if (
        movie.title &&
        movie.title.toLowerCase().includes(query.toLowerCase())
      ) {
        return movie;
      }
    });

    setMovieList(list);
  }

  return (
    <div className="m-12">
      <div className="flex justify-between items-center mb-5">
        <div className="w-full max-w-md">
          <SearchBox onSearch={handleSearch} />
        </div>
        <Button
          text="Add"
          variant="customPink"
          onClick={() => handleOpenModal("Add")}
          icon
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movieList?.map((movie, index) => (
          <div key={index}>
            <MovieCard
              title={movie?.title || ""}
              releaseYear={movie?.releaseYear || 0}
              duration={movie.duration || 0}
              thumbnail={movie.thumbnail || ""}
              onEdit={() => handleOpenModal("Edit", movie)}
              onDelete={() => handleOpenConfirmDelete(movie)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal type={modalType} onClose={handleCloseModal}>
          <MovieForm
            onClose={() => {
              console.log("Close Modal");
              handleCloseModal();
            }}
            movieData={currentMovie}
            type={modalType}
          />
        </Modal>
      )}

      <ConfirmationModal
        message={`Are you sure you want to Delete "${movieToDelete?.title}"?`}
        onConfirm={handleDelete}
        onCancel={handleCloseConfirmDelete}
        isOpen={isConfirmDeleteOpen}
      />
    </div>
  );
}
