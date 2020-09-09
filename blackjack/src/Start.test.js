import React from 'react';
import ReactDOM from 'react-dom';
import Start from './Start'

it('should render start page', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Start />, div);
  ReactDOM.unmountComponentAtNode(div);
});