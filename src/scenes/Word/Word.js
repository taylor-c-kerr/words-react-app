import React from 'react';
import {Redirect} from 'react-router-dom';
import _ from 'lodash';
import WordsApi from '../../services/api/WordsApi/index';
import Name from '../../components/Name/Name';
import Definition from '../../components/Definition/Definition';
import Button from '../../components/Button/Button';
import Validate from '../../services/validation/index';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Error from '../../components/Error/Error';

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			error: false,
			hasBeenEdited: false,
			word: {
				name: '', 
				category: [''], 
				definition: [
					{
						partOfSpeech: '', 
						entries: ['']
					}
				]
			}
		}

		this.onDataUpdate = this.onDataUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount() {
		// this.setState({ error: true });
		const {word} = this.state
		const {id} = this.props.match.params;
		if (id === 'add' || id === undefined) {
			this.setState({
				isLoaded: true,
				word: word,
				newWord: true
			})
			this._originalWord = word;
		}
		else {
			this.getWord(id)
		}
	}

	async getWord(id) {
		try {
			const word = await WordsApi.getWord(id);
			this._originalWord = word.data;
			this.setState({
				isLoaded: true,
				word: word.data,
			})
			return word;
		}
		catch (error) {
			console.error(error);
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

	onDataUpdate(data, number=null) {
		this.setState(prevState => {
			let updatedWord = Object.assign({}, prevState.word);

			if (data.hasOwnProperty('name')) {
				updatedWord.name = data.name;
			}
			else {
				let definitionClone = [...updatedWord.definition];  // array of definition objects: {partOfSpeech, entries}
				definitionClone[number] = data;
				updatedWord.definition = definitionClone;
				updatedWord.category[number] = data.partOfSpeech;
			}

			const hasBeenEdited = this.hasBeenEdited(this._originalWord, updatedWord);

			return {
				word: updatedWord,
				hasBeenEdited: hasBeenEdited
			}
		})
	}

	async handleSubmit(e) {
		let {word, newWord} = this.state;

		try {
			const data = Validate.form(word);
			if (newWord) {
				await WordsApi.postWord(data)
			}
			else {
				await WordsApi.updateWord(data)
			}

			this.setState({
				isSubmitted: true,
				hasBeenEdited: false
			})
		}
		catch (error) {
			console.error(error);
			this.setState({
				error: true
			})
		}
	}

	handleClose() {
		this.setState({isClosed: true})
	}

	handleAdd() {
		this.setState(prevState => {
			const {word} = prevState;
			const {definition} = word;
			const blankDefinition = {partOfSpeech: '', entries: ['']};

			definition.push(blankDefinition);

			return {
				definition: definition
			}
		})
	}

	render() {
		const {isLoaded, isClosed, error, hasBeenEdited} = this.state;

		if (isClosed) {
			return <Redirect push to='/' />
		}
		else if (error) {
			return <Error />;
		}
		else if (!isLoaded) {
			return <LoadingIcon />;

		}
		else {
			const {word}  = this.state;
			const {name, definition} = word;
		
			return <div>
				<div>
					<Name value={name} onDataUpdate={this.onDataUpdate}/>
					{definition.map((d, i) => <Definition key={`definition-${i}`} definition={d} onDataUpdate={this.onDataUpdate} number={i}/>)}
				</div>
				<div onClick={this.handleAdd}><Button variant='primary' value='Add Part of Speech' /></div>
				{hasBeenEdited ? <Button onClick={this.handleSubmit} value='SAVE' /> : null}
				<div onClick={this.handleClose}><Button variant='danger' value='Close' /></div>
			</div>
		}
	}
}

export default Word;