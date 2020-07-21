// import {fetchWordsPending, fetchWordsSuccess, fetchWordsError} from './actions';

const initialState = {
    pending: false,
    words: [],
    error: null
}

export function wordsReducer(state = initialState, action) {
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
                words: action.payload
            }
        case 'FETCH_WORDS_ERROR':
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

// export const getWords = state => state.words;
// export const getWordsPending = state => state.pending;
// export const getWordsError = state => state.error;
