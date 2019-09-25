import axios from 'axios';
const BASE_URL = 'https://api.thoughtfulmoose.com';

class WordsApi {
	async getWords() {
		return await axios.get(`${BASE_URL}/words`);
	}
	/*getWords() {
		return axios({
			method: 'get',
			url: `${BASE_URL}/words`,
		})
		.then(words => words)
		.catch(error => {
			console.log(error);
		})
	}*/

	/*getWords() {
		return axios.get(`${BASE_URL}/words`)
		.then(result => result)
		.catch(error => {
			console.log(error);
			return null;
		})
	}*/
}

export default new WordsApi();