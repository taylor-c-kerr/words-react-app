const initialState = {
  pending: false,
  // TODO: make words follow the object format where the key is the word id
  words: [],
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
    case 'FETCH_WORDS_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case 'DELETE_WORD': 
      return {
        ...state,
        pending: false,
        words: state.words.filter(word => word.id !== action.id)
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
    // same as add?
    case 'UPDATE_VIEWED_WORD':
      return {
        ...state
      }
    default: 
      return state;
  }
}
