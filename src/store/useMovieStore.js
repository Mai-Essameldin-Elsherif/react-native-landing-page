import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMovieStore = create(
  persist(
    (set) => ({
      movies: [
        { id: '1', title: 'Inception', genre: 'Sci-Fi', rating: '9.0', year: '2010' },
        { id: '2', title: 'Interstellar', genre: 'Sci-Fi', rating: '8.6', year: '2014' },
      ],
      addMovie: (movie) =>
        set((state) => ({
          movies: [{ ...movie, id: Date.now().toString() }, ...state.movies],
        })),
      removeMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter((item) => item.id !== id),
        })),
      updateMovie: (id, updatedMovie) =>
        set((state) => ({
          movies: state.movies.map((item) =>
            item.id === id ? { ...item, ...updatedMovie } : item
          ),
        })),
      clearMovies: () => set({ movies: [] }),
    }),
    {
      name: 'cineverse-movies-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
