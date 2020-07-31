import React from 'react';
import { Redirect } from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi';
import './styles.scss';
import { connect } from 'react-redux';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			isDeleted: false
		}

		this.handleClick = this.handleClick.bind(this);
		this.markAsDeleted = this.markAsDeleted.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClick(e) {
		this.setState({isClicked: true});
	}

	markAsDeleted(isDeletedFromChild) {
		if (isDeletedFromChild) {
			this.setState({isDeleted: true});
		}
	}

	async handleDelete() {
		const {id} = this.props;
		const toDelete = window.confirm(`delete ${id}?`);
		if (toDelete) {
			try{
				this.props.deleteWordPending();
				await WordsApi.deleteWord(id);
				this.props.deleteWordSuccess();
				this.props.deleteWord(id);
				// as of now, the delete reducer is filtering out the deleted word and the state is setting the wrong word as deleted
				// TODO: get the old functionality working
				// this.setState({ isDeleted: true });
			}
			catch(error) {
				console.error(error);
				this.props.deleteWordError(error);
			}
		}
	}

	renderDefinition(definition) {
		return definition.map((def, i) => {
			const {partOfSpeech, entries} = def;
			return <div key={`definition-${i}`}>
				<div className='partOfSpeech'>{partOfSpeech}</div>
				{entries.map((entry , ei) => {
					return <div className='entry' key={`entry-${i}-${ei}`}>{ei + 1}. {entry}</div>
				})}
			</div>
		})
}

	render() {
		const {isClicked, isDeleted} = this.state;
		const definition = this.renderDefinition(this.props.definition);
		if (isClicked) {
			const link = `/${this.props.id}`;
			return <Redirect push to={link} />; 
		}

		return (
			<div className={isDeleted ? 'deletedTile' : 'tile'}>
				<div className='definition' onClick={this.handleClick}>
					<div className='name'>
						{this.props.name}
					</div>
					{definition}
				</div>

				{/* red button with round corners */}
				{!this.state.isDeleted ? <div><button onClick={this.handleDelete}>Delete</button></div> : null}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return { 
		words: state.allWordsReducer.words,
		viewedWords: state.allWordsReducer.viewedWords,
		delete: state.deleteWordReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
    deleteWordPending: () => dispatch({ type: 'DELETE_WORD_PENDING' }),
    deleteWordSuccess: (words) => dispatch({ type: 'DELETE_WORD_SUCCESS', words }),
		deleteWordError: (error) => dispatch({ type: 'DELETE_WORD', error }),
		deleteWord: (id) => dispatch({ type: 'DELETE_WORD', id }),
		addViewedWord: (viewedWord) => {
			if (!this.props.viewedWords.find(word => word.id === viewedWord.id)) {
				dispatch({ type: 'ADD_VIEWED_WORD', viewedWord});
			}
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Tile);
