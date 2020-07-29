import { combineReducers } from "redux";
import { allWordsReducer } from './allWords.reducer';
// can maybe delete deleteWrod reducer because we can just use the current word reducer and all words reducer
import { deleteWordReducer } from './deleteWord.reducer';
import { currentWordReducer } from './currentWord.reducer';

export const rootReducer = combineReducers({ allWordsReducer, deleteWordReducer, currentWordReducer });
