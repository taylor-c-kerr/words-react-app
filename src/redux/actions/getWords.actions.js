// these do not work for some reason when putting in to Home component
const FETCH_WORDS_PENDING = 'FETCH_WORDS_PENDING';
const FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS';
const FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR';

export const fetchWordsPending = () => {
  return {
    type: FETCH_WORDS_PENDING
  }
}

export const fetchWordsSuccess = (words) => {
  return {
    type: FETCH_WORDS_SUCCESS,
    words
  }
}

export const fetchWordsError = (error) => {
  return {
    type: FETCH_WORDS_ERROR,
    error
  }
}
