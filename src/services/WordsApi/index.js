import axios from 'axios';
const BASE_URL = 'https://api.thoughtfulmoose.com';

class WordsApi {
	async getWords() {
		return await axios.get(`${BASE_URL}/words`);
	}

	async getWord(id) {
		return await axios.get(`${BASE_URL}/words/${id}`);
	}

	async postWord(word) {
		return await axios.post(`${BASE_URL}/words`, word)
	}
}

export default new WordsApi();