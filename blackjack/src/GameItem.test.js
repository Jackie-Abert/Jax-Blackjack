import React from 'react';
import ReactDOM from 'react-dom';
import GameItem from './GameItem'
import { BrowserRouter } from 'react-router-dom';

it('should render Game Item ', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <GameItem />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});