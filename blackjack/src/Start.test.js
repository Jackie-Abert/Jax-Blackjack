import React from 'react';
import ReactDOM from 'react-dom';
import Start from './Start'
import { BrowserRouter } from 'react-router-dom';

it('should render start page', () => {
  const div = document.createElement('div');
  ReactDOM.render(
 <BrowserRouter>
  <Start />
 </BrowserRouter>
  
  , div);
  ReactDOM.unmountComponentAtNode(div);
});