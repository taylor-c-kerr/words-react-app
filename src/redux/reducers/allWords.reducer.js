const initialState = {
  pending: false,
  words: {},
  viewedWords: {},
  error: null
}

export function allWordsReducer(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_WORDS_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'FETCH_WORDS_SUCCESS':
      return {
        ...state,
        pending: false,
        words: action.words
      }
    case 'ADD_TO_ALL_WORDS':
      const word = {};
      word[action.currentWord.id] = action.currentWord;
      return {
        ...state,
        pending: false,
        words: Object.assign({}, state.words, word)
      }
    case 'FETCH_WORDS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case 'DELETE_WORD':
      delete state.words[action.id];
      return {
        ...state,
        pending: false,
        words: state.words
      }
    case 'ADD_VIEWED_WORD':
      const { viewedWord } = action;
      const { id } = viewedWord;
      let viewedWordToAdd = {}
      viewedWordToAdd[id] = viewedWord
      return {
        ...state,
        viewedWords: Object.assign({}, state.viewedWords, viewedWordToAdd)
      }
    default: 
      return state;
  }
}
