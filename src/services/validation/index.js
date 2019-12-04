import uuidv4 from 'uuid/v4';

class Validate {
	form(data) {
		const id = data.id ? data.id : uuidv4();
		const {name, definition, category} = data;
		return {name, id, category, definition};
	}
}

export default new Validate();