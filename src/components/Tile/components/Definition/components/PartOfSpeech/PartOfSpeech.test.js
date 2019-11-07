import React from 'react';
import ReactDOM from 'react-dom';
import PartOfSpeech from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PartOfSpeech partOfSpeech='thisIsAPartOfSpeech' />, div);
  ReactDOM.unmountComponentAtNode(div);
});
