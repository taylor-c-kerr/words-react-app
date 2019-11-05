import React from 'react';
import ReactDOM from 'react-dom';
import Definition from './index';

const sampleDefinition = [
	{
		"partOfSpeech": "noun",
		"entries": [
			"a fun loving pet",
			"a domesticated canine"
		]
	},
	{
		"partOfSpeech": "verb",
		"entries": [
			"to torment someone"
		]
	}
]


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Definition definition={sampleDefinition} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
