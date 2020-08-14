import React from 'react';
import { Redirect } from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi';
import './tile.scss';
import { connect } from 'react-redux';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const TilePropTypes = {
	id: PropTypes,
	deleteWordPending: PropTypes.func.isRequired,
	deleteWordSuccess: PropTypes.func.isRequired,
	deleteWord: PropTypes.func.isRequired,
	deleteWordError: PropTypes.func.isRequired,
	definition: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	viewedWords: PropTypes.any,
};
type Props = PropTypes.InferProps<typeof TilePropTypes>
type State = {
  isClicked: boolean,
  isDeleted: boolean
}

class Tile extends React.Component<Props, State> {
  static propTypes: {};
  constructor(props: Props) {
		super(props);
		this.state = {
			isClicked: false,
			isDeleted: false
		}

		this.handleClick = this.handleClick.bind(this);
		this.markAsDeleted = this.markAsDeleted.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClick() {
		this.setState({isClicked: true});
	}

	markAsDeleted(isDeletedFromChild: boolean) {
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

	renderDefinition(definition: any) {
		return definition.map((def: any, i: number) => {
			const {partOfSpeech, entries} = def;
			return <div key={`definition-${i}`}>
				<div className='partOfSpeech'>{partOfSpeech}</div>
				{entries.map((entry: any, ei: number) => {
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
			<div className={`tile ${isDeleted ? 'deleted' : ''}`}>
				<div className='definition' onClick={this.handleClick}>
					<div className='name'>{this.props.name}</div>
					{definition}
				</div>
				<div className="buttons-container">

				{!this.state.isDeleted ? <Button icon="delete_forever" clickHandler={this.handleDelete}/> : ''}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => {
  return { 
		words: state.allWordsReducer.words,
		viewedWords: state.allWordsReducer.viewedWords,
		delete: state.deleteWordReducer
	}
}
const mapDispatchToProps = (dispatch: any) => {
	return {
    deleteWordPending: () => dispatch({ type: 'DELETE_WORD_PENDING' }),
    deleteWordSuccess: (words: any) => dispatch({ type: 'DELETE_WORD_SUCCESS', words }),
		deleteWordError: (error: any) => dispatch({ type: 'DELETE_WORD', error }),
		deleteWord: (id: any) => dispatch({ type: 'DELETE_WORD', id }),
		addViewedWord: (viewedWord: any) => dispatch({ type: 'ADD_VIEWED_WORD', viewedWord}),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Tile);
