import React from 'react';
import ReactDOM from 'react-dom';
import NewGameButton from './NewGameButton'
import { BrowserRouter } from 'react-router-dom';

it('should render NewGameButton', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <NewGameButton />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});