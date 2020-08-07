import _ from 'lodash';
const initialState = {
  currentWord: {
    name: '', 
    category: [''], 
    definition: [
      {
        partOfSpeech: '', 
        entries: ['']
      }
    ],
  },
  availablePartsOfSpeech: ['noun', 'verb', 'adjective', 'adverb', 'preposition'],
  pending: false,
  error: null,
};

export function currentWordReducer(state = initialState, action) {
  switch(action.type) {
    case 'CURRENT_WORD_PENDING':
      return {
        ...state,
        pending: true,
      };
    case 'CURRENT_WORD_SUCCESS':
      return {
        ...state,
        pending: false,
        currentWord: action.currentWord,
      };
    case 'CURRENT_WORD_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case 'ADD_AVAILABLE_POS':
      if (state.availablePartsOfSpeech.includes(action.pos)) {
        console.warn('errrr, part of speech already included')
        return { ...state }
      }
      const addedPos = [...state.availablePartsOfSpeech];
      addedPos.push(action.pos);
      return {
        ...state,
        availablePartsOfSpeech: addedPos,
      }
    case 'REMOVE_AVAILABLE_POS':
      return {
        ...state,
        availablePartsOfSpeech: _.difference(state.availablePartsOfSpeech, action.pos),
      }
    case 'SET_AVAILABLE_POS':
      const setAvailableTo = _.difference(initialState.availablePartsOfSpeech, action.pos)
      return {
        ...state,
        availablePartsOfSpeech: setAvailableTo,
      }
    default:
      return state;
  }
}