import React from 'react';
import WordsApi from '../../services/api/WordsApi/index';
import Name from './components/Name/index';
import Definition from './components/Definition/index';
import CloseButton from '../../components/CloseButton/index.js';
import Validate from '../../services/validation/index'

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			word: null,
			error: false,
			hasBeenEdited: false,
			isSubmitted: false,
			form: null
		}

		this.getUpdatedDefinitions = this.getUpdatedDefinitions.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const {id} = this.props.match.params;
		try {
			const word = await WordsApi.getWord(id);
			this.setState({
				isLoaded: true,
				word: word.data
			})
		}
		catch (error) {
			console.log(error.request);
			this.setState({
				error: true
			})
		}
	}

	getUpdatedDefinitions(definition) {
		const {word} = this.state;

		this.setState({
			form: {
				name: word.name,
				id: word.id,
				definition: definition
			}
		})

		if (definition !== this.state.word.definition) {
			this.setState({
				hasBeenEdited: true
			})
		}
	}

	async handleSubmit(e) {
		const {form} = this.state;
		try {
			const data = Validate.form(form);
			await WordsApi.updateWord(data)
			this.setState({
				isSubmitted: true,
				hasBeenEdited: false
			})
		}
		catch (error) {
			console.log(error);
			alert(error);
		}


	}

	render() {
		const {word, isLoaded, error, hasBeenEdited, isSubmitted} = this.state;
		let content;

		if (error) {
			content = <div>THERE WAS AN ERROR</div>;
		}
		else if (!isLoaded) {
			content = <div>LOADING...</div> ;
		}
		else {
			content = 
			<div>
				<Name name={word.name} />
				<Definition definition={word.definition} sendDefinitions={this.getUpdatedDefinitions}/>
			</div>;
		}

		return <div>
			{content}
			{hasBeenEdited ? <button onClick={this.handleSubmit}>SAVE</button> : null}
			<CloseButton />
		</div>
	}
}

export default Word;