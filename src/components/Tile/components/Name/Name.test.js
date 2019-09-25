import React from 'react';
import ReactDOM from 'react-dom';
import Name from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Name name="test-name"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
