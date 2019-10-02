import React from 'react';
import ReactDOM from 'react-dom';
import Input from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Input name='test' defaultValue='defualt me' />, div);
  ReactDOM.unmountComponentAtNode(div);
});
