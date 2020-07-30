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
import { connect } from 'react-redux';

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

	async componentDidMount() {
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
			if (!this.props.viewedWords[id]) {
				await this.getWord(id);
			} else {
				this._originalWord = this.props.viewedWords[id];
				this.setState({
					isLoaded: true,
					word: this._originalWord,
				})
			}
		}
	}

	async getWord(id) {
		try {
			this.props.currentWordPending();
			const word = await WordsApi.getWord(id);
			this._originalWord = word.data;
			this.setState({
				isLoaded: true,
				word: word.data,
			})
			this.props.addViewedWord(this._originalWord);
			this.props.addCurrentWord(this._originalWord);
		}
		catch (error) {
			console.error(error);
			this.setState({
				error: true
			})
			this.props.currentWordError(error);
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

	// what does this do?
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
			word = Validate.form(word);
			this.props.currentWordPending();
			if (newWord) {
				await WordsApi.postWord(word);
				this.props.addCurrentWord(word);
			}
			else {
				await WordsApi.updateWord(word);
			}
			this.props.addToAllWords(word);
			this.props.addCurrentWord(word);

			this.setState({
				isSubmitted: true,
				hasBeenEdited: false
			})
		}
		catch (error) {
			console.error(error);
			this.setState({
				error: true
			});
			this.props.currentWordError(error);
		}
	}

	handleClose() {
		this.setState({isClosed: true});
		this.props.currentWordError(null);
		this.props.addCurrentWord({});
	}

	// what is this method?
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

const mapStateToProps = (state) => {
  return { 
		words: state.allWordsReducer.words,
		viewedWords: state.allWordsReducer.viewedWords,
		currentWord: state.currentWordReducer.currentWord,
		delete: state.deleteWordReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addViewedWord: (viewedWord) => dispatch({ type: 'ADD_VIEWED_WORD', viewedWord }),
		currentWordPending: () => dispatch({ type: 'CURRENT_WORD_PENDING' }),
		currentWordError: () => dispatch({ type: 'CURRENT_WORD_ERROR' }),
		addCurrentWord: (currentWord) => dispatch({ type: 'CURRENT_WORD_SUCCESS', currentWord }),
		addToAllWords: (currentWord) => dispatch({ type: 'ADD_TO_ALL_WORDS', currentWord })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
