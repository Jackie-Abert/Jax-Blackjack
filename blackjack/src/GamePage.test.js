import React from 'react';
import ReactDOM from 'react-dom';
import GamePage from './GamePage'
import { BrowserRouter } from 'react-router-dom';

it('should render Game page', () => {
  const div = document.createElement('div');
  const props = {
    match:{params:{id:'1'}}
  }
  ReactDOM.render(
  <BrowserRouter>
  <GamePage {...props}/>
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});