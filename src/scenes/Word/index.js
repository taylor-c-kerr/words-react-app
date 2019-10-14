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
			form: {
				definition: []
			}
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

	getUpdatedDefinitions(newDefinition) {
		const {definition} = this.state.word;
		newDefinition = newDefinition.filter(def => def !== '');
		this.setState({
			form: {
				definition: newDefinition
			}
		})
		
		const hasBeenEdited = !newDefinition.every(def => definition.includes(def));

		this.setState({
			hasBeenEdited: hasBeenEdited
		})


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
		const {word, isLoaded, error, hasBeenEdited } = this.state;
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