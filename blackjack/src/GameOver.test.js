import React from 'react';
import ReactDOM from 'react-dom';
import GameOver from './GameOver'
import { BrowserRouter } from 'react-router-dom';

it('should render Game Over page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <GameOver />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});