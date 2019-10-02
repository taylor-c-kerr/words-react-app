import React from 'react';
import ReactDOM from 'react-dom';
import DeleteButton from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteButton/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
