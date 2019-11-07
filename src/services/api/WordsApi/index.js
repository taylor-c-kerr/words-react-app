import axios from 'axios';
// const BASE_URL = 'https://api.thoughtfulmoose.com';
const BASE_URL = 'http://localhost:3000';

class WordsApi {
	async getWords() {
		return await axios.get(`${BASE_URL}/words`);
	}

	async getWord(id) {
		return await axios.get(`${BASE_URL}/words/${id}`);
	}

	async postWord(word) {
		return await axios.post(`${BASE_URL}/words`, word);
	}

	async deleteWord(id) {
		return await axios.delete(`${BASE_URL}/words/${id}`);
	}

	async updateWord(word) {
		return await axios.put(`${BASE_URL}/words/${word.id}`, word);
	}
}

export default new WordsApi();