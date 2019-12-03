import React from 'react';
import ReactDOM from 'react-dom';
import Definition from './index';

const definition = {"entries":["a fun loving pet","a domesticated canine"],"partOfSpeech":"noun"};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Definition definition={definition} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
