import axios, { CancelToken } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../entities/player';

interface AppState {
   players: Player[];
   favorites: Player[];
   currentPage: number;
   totalPages: number;
   search: string;
   isLoading: boolean;
   error: string | undefined;
   bgColor: string;
}

const initialState: AppState = {
   players: [],
   favorites: [],
   currentPage: 1,
   totalPages: 50,
   search: '',
   isLoading: false,
   error: undefined,
   bgColor: '#fa7d13',
};

interface FetchPlayersArgs {
   page: number;
   search: string;
   cancelToken?: CancelToken | undefined;
}

export const fetchPlayersAsync = createAsyncThunk(
   'players/fetchPlayers',
   async ({ page, search, cancelToken }: FetchPlayersArgs) => {
      const response = await axios.get(`https://www.balldontlie.io/api/v1/players?page=${page}&search=${search}`, {
         cancelToken,
      });
      return response.data;
   }
);

const playersSlice = createSlice({
   name: 'players',
   initialState,
   reducers: {
      setPlayers: (state, action: PayloadAction<Player[]>) => {
         state.players = action.payload;
      },
      toggleFavorite: (state, action: PayloadAction<Player>) => {
         const exists = state.favorites.find((fav) => fav.id === action.payload.id);
         if (exists) {
            state.favorites = state.favorites.filter((fav) => fav.id !== action.payload.id);
         } else {
            state.favorites.push(action.payload);
         }
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
         state.currentPage = action.payload;
      },
      setSearchQuery: (state, action: PayloadAction<string>) => {
         state.currentPage = 1;
         state.search = action.payload;
      },
      setBgColor: (state, action: PayloadAction<string>) => {
         state.bgColor = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPlayersAsync.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
         })
         .addCase(fetchPlayersAsync.fulfilled, (state, action) => {
            state.players = action.payload.data;
            state.totalPages = action.payload.meta.total_pages;
            state.isLoading = false;
            state.error = undefined;
         })
         .addCase(fetchPlayersAsync.rejected, (state, action) => {
            // Check if the error is due to request cancellation
            if (action.error.code === 'ERR_CANCELED') {
               // If it's a cancellation, do nothing
               return;
            }

            state.isLoading = false;
            state.error = action.error.message;
         });
   },
});

export const { setPlayers, toggleFavorite, setCurrentPage, setSearchQuery, setBgColor } = playersSlice.actions;
export default playersSlice.reducer;