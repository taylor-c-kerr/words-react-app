import React from 'react';
import ReactDOM from 'react-dom';
import Definition from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Definition definition={["definitions", "are", "fun"]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
