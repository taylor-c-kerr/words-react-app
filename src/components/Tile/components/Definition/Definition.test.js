import React from 'react';
import ReactDOM from 'react-dom';
import Definition from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Definition definition={["this is a test definition :)"]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
