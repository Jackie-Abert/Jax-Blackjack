import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card'
import { BrowserRouter } from 'react-router-dom';

it('should render a card', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <Card />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});