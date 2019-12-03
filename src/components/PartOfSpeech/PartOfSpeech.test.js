import React from 'react';
import ReactDOM from 'react-dom';
import PartOfSpeech from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PartOfSpeech value={'Noun'} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
