import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login'
import { BrowserRouter } from 'react-router-dom';

it('should render Login page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  <Login />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});