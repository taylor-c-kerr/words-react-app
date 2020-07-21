export const deleteWordsPending = () => {
  return {
    type: 'DELETE_WORD_PENDING'
  }
}

export const deleteWordsSuccess = (words) => {
  return {
    type: 'DELETE_WORD_SUCCESS',
    words
  }
}

export const deleteWordsError = (error) => {
  return {
    type: 'DELETE_WORD_ERROR',
    error
  }
}
