const initialState = {
  currentWord: {
    name: '', 
    category: [''], 
    definition: [
      {
        partOfSpeech: '', 
        entries: ['']
      }
    ]
  },
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
        currentWord: action.currentWord
      };
    case 'CURRENT_WORD_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}