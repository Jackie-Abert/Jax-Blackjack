import React from 'react';
import ReactDOM from 'react-dom';
import LoadGameButton from './LoadGameButton'
import { BrowserRouter } from 'react-router-dom';

it('should render LoadGameButton page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <LoadGameButton />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});