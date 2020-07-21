// this does not work when importing to Home component
import {fetchWordsPending, fetchWordsSuccess, fetchWordsError} from './actions';
import axios from 'axios';

function getWords() {
    console.log('getting words');
    return dispatch => {
        dispatch(fetchWordsPending());
        axios.get('http://localhost:3000/words')
            .then(response => {
                console.log(response)
                dispatch(fetchWordsSuccess(response.data));
                return response.data;
            })
            .catch(error => {
                console.log('error', error)
                fetchWordsError(error);
            })
    }
}

export default getWords;
