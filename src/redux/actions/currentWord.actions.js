const CURRENT_WORD_PENDING = 'CURRENT_WORD_PENDING';
const CURRENT_WORD_SUCCESS = 'CURRENT_WORD_SUCCESS';
const CURRENT_WORD_ERROR = 'CURRENT_WORD_ERROR';
const ADD_AVAILABLE_POS = 'ADD_AVAILABLE_POS';
const REMOVE_AVAILABLE_POS = 'REMOVE_AVAILABLE_POS';
const SET_DEFAULT_WORD = 'SET_DEFAULT_WORD';

export const currentWordPending = () => {
  return {
    type: CURRENT_WORD_PENDING
  }
}

export const currentWordSuccess = (word) => {
  return {
    type: CURRENT_WORD_SUCCESS,
    word
  }
}

export const currentWordError = (error) => {
  return {
    type: CURRENT_WORD_ERROR,
    error
  }
}

export const addAvailabePos = (pos) => {
  return {
    type: ADD_AVAILABLE_POS,
    pos
  }
}

export const removeAvailablePos = (pos) => {
  return {
    type: REMOVE_AVAILABLE_POS,
    pos
  }
}

export const setAvailablePos = (pos) => {
  return {
    type: REMOVE_AVAILABLE_POS,
    pos
  }

export const setDefaultWord = () => {
  return {
    type: SET_DEFAULT_WORD,
  }
}
}
