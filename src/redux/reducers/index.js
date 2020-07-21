import { combineReducers } from "redux";
import { getWordsReducer } from './getWords.reducer';
import { deleteWordReducer } from './deleteWord.reducer';

export const rootReducer = combineReducers({ getWordsReducer, deleteWordReducer });
