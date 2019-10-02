import React from 'react';
import ReactDOM from 'react-dom';
import AddWordButton from './index';

it('renders without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<AddWordButton/>, div);
ReactDOM.unmountComponentAtNode(div);
});
