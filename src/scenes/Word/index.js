import React from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import WordsApi from '../../services/api/WordsApi/index';
import Name from './components/Name/index';
import Definition from './components/Definition/index';
import Button from '../../components/Button/index.js';
import Validate from '../../services/validation/index'

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			error: false,
			hasBeenEdited: false
		}

		this.onDataUpdate = this.onDataUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		const emptyWord = {name: 'New Name', category: ['new category'], definition: [{partOfSpeech: 'newPartOfSpeech', entries: ['newEntry']}]}
		const {id} = this.props.match.params;
		console.log(id);
		if (id === 'add') {
			this.setState({
				isLoaded: true,
				word: emptyWord
			})
		}
		else {
			this.getWord(id)
		}
	}

	async getWord(id) {
		try {
			const word = await WordsApi.getWord(id);
			this._originalWord = word.data
			this.setState({
				isLoaded: true,
				word: word.data,
			})
			return word;
		}
		catch (error) {
			console.log(error);
			this.setState({
				error: true
			})
		}
	}

	hasBeenEdited(previous, current) {
		let copy = Object.assign({}, current);
		copy.definition = [];

		// having to do this to make a unique copy and not modify the original
		for (let i = 0; i < current.definition.length; i++) {
			let def = current.definition[i];
			let newDef = {entries: null, partOfSpeech: null};
			// looping through each definition element/object and adding it to newDef
			for (let x in def) {
				if (x=== 'entries') {
					newDef.entries = def[x].filter(e => e !== '')
				}
				else {
					newDef.partOfSpeech = def[x]
				}
			}
			copy.definition.push(newDef)
		}

		return !_.isEqual(previous, copy)

	}

	onDataUpdate(data) {
		this.setState(prevState => {
			let updatedWord = Object.assign({}, prevState.word)
			let newDefinition = [...updatedWord.definition];  // array of definition objects {partOfSpeech, entries}

			newDefinition = newDefinition.map(def => {
				if (def.partOfSpeech === data.partOfSpeech) {
					def = data;
				}
				return def;
			})

			updatedWord.definition = newDefinition;

			const hasBeenEdited = this.hasBeenEdited(this._originalWord, updatedWord)

			return {
				word: updatedWord,
				hasBeenEdited: hasBeenEdited
			}
		})
	}

	async handleSubmit(e) {
		let {word} = this.state;

		try {
			const data = Validate.form(word);
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

	handleClose() {
		this.setState({isClosed: true})
	}

	render() {
		const {isLoaded, isClosed, error, hasBeenEdited} = this.state;
		let content;

		if (isClosed) {
			return <Redirect push to='/' />
		}

		if (error) {
			content = <div>THERE WAS AN ERROR</div>;
		}
		else if (!isLoaded) {
			content = <div>LOADING...</div> ;
		}
		else {
			const {word}  = this.state;

			content = 
			<div>
				<Name name={word.name} />
				{word.definition.map((d, i) => {
					return <Definition key={`definition-${i}`} definition={d} onDataUpdate={this.onDataUpdate} number={i}/>		
				})}
				
			</div>;
		}

		return <div>
			{content}
			{hasBeenEdited ? <button onClick={this.handleSubmit}>SAVE</button> : null}
			<div onClick={this.handleClose}><Button variant='danger' value='Close' /></div>
		</div>
	}
}

export default Word;