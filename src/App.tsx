import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import PlayerList from './components/player-list';
import FavoriteList from './components/favorite-list';
import { Container, ResetGlobalStyle } from './styles/global';
import { ListWrapper } from './styles/list';

function App() {
  return (
    <>
      <ResetGlobalStyle />
      <Provider store={store}>
        <Container>
          <ListWrapper>
            <PlayerList />
          </ListWrapper>
          <ListWrapper>
            <FavoriteList />
          </ListWrapper>
        </Container>
      </Provider>
    </>
  );
}

export default App;