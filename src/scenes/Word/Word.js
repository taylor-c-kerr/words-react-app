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
			isEdited: false,
			isClosed: false
		}
		this._originalWord = null;
		this.isNewWord = null;
		this.onWordEdit = this.onWordEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddPartOfSpeech = this.handleAddPartOfSpeech.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		if (id === 'add' || id === undefined) {
			this.isNewWord = true;
		}
		else {
			if (!this.props.viewedWords[id]) {
				await this.getWord(id);
				this.props.addViewedWord(this._originalWord);
			} else {
				this._originalWord = _.cloneDeep(this.props.viewedWords[id]);
			}
			this.props.addCurrentWord(this._originalWord);
		}
		this._originalWord = this.props.currentWord;
	}

	async getWord(id) {
		try {
			this.props.currentWordPending();
			const word = await WordsApi.getWord(id);
			this._originalWord = _.cloneDeep(word.data);
		}
		catch (error) {
			console.error(error);
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

	onWordEdit(data, number=null) {
		const editedWord = _.cloneDeep(this.props.currentWord);

		// this block can probably be nixed because backend doesnt support name change
		if (data && data.name) {
			editedWord.name = data.name;
		} else {
			editedWord.definition[number] = data;
			editedWord.category[number] = data.partOfSpeech;
		}

		const isEdited = this.hasBeenEdited(this._originalWord, editedWord);
		this.setState({ isEdited });
		this.props.addCurrentWord(editedWord);
	}

	async handleSubmit(e) {
		let word = _.cloneDeep(this.props.currentWord);

		try {
			word = Validate.form(word);
			this.props.currentWordPending();
			if (this.isNewWord) {
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
				isEdited: false
			})
		}
		catch (error) {
			console.error(error);
			this.props.currentWordError(error);
		}
	}

	handleClose() {
		this.setState({isClosed: true});
		this.props.currentWordError(null);
		this.props.addCurrentWord({});
	}

	handleAddPartOfSpeech() {
		const editedWord = _.cloneDeep(this.props.currentWord);
		editedWord.definition.push({ partOfSpeech: '', entries: [''] });
		this.props.addCurrentWord(editedWord);
	}

	render() {
		const { isClosed, isEdited } = this.state;
		const { pending, error } = this.props

		if (isClosed) {
			return <Redirect push to='/' />
		} else if (error) {
			return <Error />;
		} else {
			const word = this.props.currentWord;
			const {name, definition} = word;

			if (pending || !name || !definition) {
				return <LoadingIcon />;
			}
		
			return <div>
				<div>
					<Name value={name} onDataUpdate={this.onWordEdit}/>
					Definitions:{definition.map((d, i) => <Definition key={`definition-${i}`} definition={d} onDataUpdate={this.onWordEdit} number={i}/>)}
				</div>
				<div onClick={this.handleAddPartOfSpeech}><Button variant='primary' value='Add Part of Speech' /></div>
				{isEdited ? <Button onClick={this.handleSubmit} value='SAVE' /> : null}
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
		delete: state.deleteWordReducer,
		pending: state.currentWordReducer.pending,
		error: state.currentWordReducer.error,
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
