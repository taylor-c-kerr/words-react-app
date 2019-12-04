import React from 'react';
import ReactDOM from 'react-dom';
import Entry from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Entry entry='this is a dictionary entry' number={1} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
