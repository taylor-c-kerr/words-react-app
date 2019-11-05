import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './index';

const sampleData =   {
    "id": "33459554-a8f0-46c2-9b51-d59844209892",
    "name": "dog",
    "category": [
      "noun",
      "verb",
      "animal"
    ],
    "definition": [
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
  }

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tile name={sampleData.name} definition={sampleData.definition}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
