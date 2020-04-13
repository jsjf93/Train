import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { StoreProvider } from './Context';
import AppRouter from './Content/AppRouter';

const App = observer(() => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
});

export default App;
