import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBgColor, toggleFavorite } from '../features/player-slice';
import { RootState } from '../store';
import { Button, TopBar } from '../styles/global';
import { ListContainer, ListItem } from '../styles/list';
import ColorPicker from './color-picker';
import styled from 'styled-components';

const StyledFavoriteListContanier = styled(ListContainer) <{ bgColor?: string }>`
   background: ${props => props.bgColor};
`;

const FavoriteList: React.FC = () => {
   const { favorites, bgColor } = useSelector((state: RootState) => state.players);
   const dispatch = useDispatch();

   return (
      <>
         <TopBar>
            <ColorPicker
               label="Choose background color:"
               id="bgColorPicker"
               value={bgColor}
               onChange={(newColor) => dispatch(setBgColor(newColor))}
            />
         </TopBar>
         <StyledFavoriteListContanier bgColor={bgColor}>
            {favorites.map(fav => (
               <ListItem key={fav.id}>
                  {`${fav.first_name} ${fav.last_name}`}
                  <Button onClick={() => dispatch(toggleFavorite(fav))}>Unfavorite</Button>
               </ListItem>
            ))}
         </StyledFavoriteListContanier>
      </>
   );
};

export default FavoriteList;