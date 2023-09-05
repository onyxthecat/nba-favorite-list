import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayersAsync, toggleFavorite, setCurrentPage, setSearchQuery } from '../features/player-slice';
import { RootState, AppDispatch } from '../store';
import { Button, TopBar } from '../styles/global';
import SearchBar from './search-bar';
import Pagination from './pagination';
import debounce from 'lodash.debounce';
import { ListContainer, ListItem } from '../styles/list';
import { Player } from '../entities/player';
import axios from 'axios';

const PlayerList: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();
   const { players, currentPage, totalPages, search, isLoading, error } = useSelector((state: RootState) => state.players);

   useEffect(() => {
      const cancelTokenSource = axios.CancelToken.source();
      dispatch(fetchPlayersAsync({ page: currentPage, search, cancelToken: cancelTokenSource.token }));

      return () => {
         cancelTokenSource.cancel();
      };

   }, [dispatch, currentPage, search]);

   useEffect(() => {
      if (error) {
         alert(`Err: ${error}`);
      }
   }, [error]);

   const debouncedSearch = useCallback(debounce((query: string) => dispatch(setSearchQuery(query)), 300), [dispatch]);

   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
   }, [dispatch]);

   const handlePageChange = useCallback((newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
         dispatch(setCurrentPage(newPage));
      }
   }, [dispatch, totalPages]);

   const goToNextPage = useCallback(() => handlePageChange(currentPage + 1), [currentPage, handlePageChange]);
   const goToPrevPage = useCallback(() => handlePageChange(currentPage - 1), [currentPage, handlePageChange]);
   const togglePlayerFavorite = useCallback((player: Player) => () => dispatch(toggleFavorite(player)), [dispatch]);

   return (
      <>
         <TopBar>
            <SearchBar
               onChange={handleSearchChange}
            />
            <Pagination
               onNext={goToNextPage}
               onPrev={goToPrevPage}
            />
         </TopBar>
         <ListContainer isLoading={isLoading}>
            {players.map(player => (
               <ListItem key={player.id}>
                  {`${player.first_name} ${player.last_name}`}
                  <Button onClick={togglePlayerFavorite(player)}>Favorite</Button>
               </ListItem>
            ))}
         </ListContainer>
      </>
   )
};

export default PlayerList;