import { IMovie } from "@/libs/types";
import { create } from "zustand";

type State = {
  movies: IMovie[];
};

type Action = {
  setMoviesAction: (movies: IMovie[]) => void;
};

const initialState: State = {
  movies: [],
};

export const useMoviesStore = create<State & Action>((set) => ({
  ...initialState,
  setMoviesAction: (newMovies: IMovie[]) => set({ movies: newMovies }),
}));
