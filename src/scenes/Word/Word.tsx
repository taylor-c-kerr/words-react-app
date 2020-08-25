import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import WordsApi from '../../services/api/WordsApi/index';
import Definition from '../../components/Definition/Definition';
import Validate from '../../services/validation/index';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Error from '../../components/Error/Error';
import Button from '../../components/Button/Button';
import './word.scss';

const WordPropTypes = {
  addCurrentWord: PropTypes.func.isRequired,
  addToAllWords: PropTypes.func.isRequired,
  addViewedWord: PropTypes.func.isRequired,
  currentWord: PropTypes.any.isRequired,
  currentWordError: PropTypes.func.isRequired,
  currentWordPending: PropTypes.func.isRequired,
  delete: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  match: PropTypes.any.isRequired,
  pending: PropTypes.bool.isRequired,
  resetAvailablePos: PropTypes.func.isRequired,
  setDefaultWord: PropTypes.func.isRequired,
  viewedWords: PropTypes.any.isRequired,
  words: PropTypes.any.isRequired,
}

type Props = PropTypes.InferProps<typeof WordPropTypes>;
type State = {
  isEdited: boolean;
  isClosed: boolean;
  isNewWord: boolean;
  isSubmitted: boolean;
}

class Word extends React.Component<Props, State> {
  static propTypes: {};
  private _originalWord: any;
  constructor(props: Props) {
		super(props);
		this.state = {
			isEdited: false,
			isClosed: false,
      isNewWord: false,
      isSubmitted: false,
		}
		this._originalWord = null;
		this.onWordEdit = this.onWordEdit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddPartOfSpeech = this.handleAddPartOfSpeech.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
  }

	async componentDidMount() {
		const { id } = this.props.match.params;
		if (id === 'add' || id === undefined) {
			this.setState({ isNewWord: true })
			this.props.setDefaultWord();
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

	async getWord(id: string) {
		try {
			this.props.currentWordPending();
			const word = await WordsApi.getWord(id);
			this._originalWord = _.cloneDeep(word.data);
		}
		catch (error) {
			console.error(error);
			this.props.currentWordError(error.response.data);
		}
	}

	hasBeenEdited(previous: any, current: any) {
		let copy = Object.assign({}, current);
		copy.definition = [];

		// having to do this to make a unique copy and not modify the original
		for (let i = 0; i < current.definition.length; i++) {
			let def = current.definition[i];
			let newDef = {entries: null, partOfSpeech: null};
			// looping through each definition element/object and adding it to newDef
			for (let x in def) {
				if (x=== 'entries') {
					newDef.entries = def[x].filter((e: any) => e !== '')
				}
				else {
					newDef.partOfSpeech = def[x]
				}
			}
			copy.definition.push(newDef)
		}

		return !_.isEqual(previous, copy)
	}

	onNameChange(e: any) {
		const name = e.target.value;
		this.onWordEdit({name})
	}

	onWordEdit(data: any, number: any = null) {
		const editedWord = _.cloneDeep(this.props.currentWord);
		if (data.name) {
			editedWord.name = data.name
		}
		if (data.partOfSpeech || data.entries) {
			editedWord.definition[number] = data;
			editedWord.category[number] = data.partOfSpeech;
		}
		const isEdited = this.hasBeenEdited(this._originalWord, editedWord);
		this.setState({ isEdited });
		this.props.addCurrentWord(editedWord);
	}

	async handleSubmit() {
		let word = _.cloneDeep(this.props.currentWord);

		try {
			word = Validate.form(word);
			this.props.currentWordPending();
			if (this.state.isNewWord) {
				await WordsApi.postWord(word);
				this.props.addCurrentWord(word);
			}
			else {
				await WordsApi.updateWord(word);
			}
			this.props.addToAllWords(word);
			this.props.addCurrentWord(word);
			this.props.addViewedWord(word);

			this.setState({
				isSubmitted: true,
				isEdited: false
			})
		}
		catch (error) {
			console.error(error);
			this.props.currentWordError(error.response.data);
		}
	}

	handleClose() {
		this.setState({isClosed: true});
		this.props.currentWordError(null);
		this.props.addCurrentWord({});
		this.props.resetAvailablePos();
	}

	handleAddPartOfSpeech() {
		const editedWord = _.cloneDeep(this.props.currentWord);
		editedWord.definition.push({ partOfSpeech: '', entries: [''] });
		this.props.addCurrentWord(editedWord);
	}

	render() {
		const { isClosed, isEdited, isNewWord } = this.state;
		const { pending, error } = this.props

		if (isClosed) {
			return <Redirect push to='/' />
		} else if (error) {
			return <Error />;
		} else {
			const word = this.props.currentWord;
			const {name, definition} = word;

			if (pending || name === undefined || definition === undefined) {
				return <LoadingIcon />;
			}

			if (_.isEmpty(definition)) {
				return (
					<div className="word">
						<h2>Nothing to display</h2>
						Go back
						<Button icon="arrow_back" hoverText="Go to home page" hoverDirection="right" clickHandler={this.handleClose} />
					</div>
				)
			}
		
			return (
				<div className="word">
					{isNewWord ? <input placeholder="Enter a name..." onChange={this.onNameChange}></input> : <p className="word-name">{name}</p>}
					Definitions:{definition.map((d: any, i: number) => <Definition key={`definition-${i}`} definition={d} onDataUpdate={this.onWordEdit} number={i} isNewWord={isNewWord}/>)}
					<Button icon="add" hoverText="Add Part Of Speech" hoverDirection="right" clickHandler={this.handleAddPartOfSpeech} />
					{isEdited ? <button onClick={this.handleSubmit}>SAVE</button> : ''}
					<Button icon="close" hoverText="Close" hoverDirection="right" clickHandler={this.handleClose} />
				</div>
			)
		}
	}
}

Word.propTypes = WordPropTypes;

const mapStateToProps = (state: any) => {
  return { 
		words: state.allWordsReducer.words,
		viewedWords: state.allWordsReducer.viewedWords,
		currentWord: state.currentWordReducer.currentWord,
		delete: state.deleteWordReducer,
		pending: state.currentWordReducer.pending,
		error: state.currentWordReducer.error,
	}
}
const mapDispatchToProps = (dispatch: any) => {
	return {
		addViewedWord: (viewedWord: any) => dispatch({ type: 'ADD_VIEWED_WORD', viewedWord }),
		currentWordPending: () => dispatch({ type: 'CURRENT_WORD_PENDING' }),
		currentWordError: (error: any) => dispatch({ type: 'CURRENT_WORD_ERROR', error }),
		addCurrentWord: (currentWord: any) => dispatch({ type: 'CURRENT_WORD_SUCCESS', currentWord }),
		addToAllWords: (currentWord: any) => dispatch({ type: 'ADD_TO_ALL_WORDS', currentWord }),
		resetAvailablePos: () => dispatch({ type: 'RESET_AVAILABLE_POS' }),
		setDefaultWord: () => dispatch({ type: 'SET_DEFAULT_WORD' }),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
