const initialState = {
  pending: false,
  error: null
}

export function deleteWordReducer(state = initialState, action) {
  switch(action.type) {
    case 'DELETE_WORD_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'DELETE_WORD_SUCCESS':
      return {
        ...state,
        pending: false,
      }
    case 'DELETE_WORD_ERROR':
      return {
        ...state,
        pending: false,
        error: action.error
      }
      default: 
        return state;
  }
}
