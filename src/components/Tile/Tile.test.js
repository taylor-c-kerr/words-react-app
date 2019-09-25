import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile name="naming" definition={["this is a test"]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
