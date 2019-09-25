import axios from 'axios';
const BASE_URL = 'https://api.thoughtfulmoose.com';

class WordsApi {
	async getWords() {
		return await axios.get(`${BASE_URL}/words`);
	}
}

export default new WordsApi();