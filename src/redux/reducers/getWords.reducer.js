const initialState = {
  pending: false,
  words: [],
  error: null
}

export function getWordsReducer(state = initialState, action) {
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
    default: 
      return state;
  }
}
