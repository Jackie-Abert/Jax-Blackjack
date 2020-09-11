import React from 'react';
import ReactDOM from 'react-dom';
import DeleteGame from './DeleteGame'
import { BrowserRouter } from 'react-router-dom';

it('should render DeleteGame page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <DeleteGame />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});