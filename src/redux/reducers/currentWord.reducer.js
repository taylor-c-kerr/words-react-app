const initialState = {
  currentWord: {},
  pending: false,
  error: null,
};

/* 
  GET_WORD
  SET_PENDING
  SET_ERROR
  SET_SUCCESS
  UPDATE_WORD  
*/
/* 
case 'ACTION':
  return {}
*/

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