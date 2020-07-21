import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../Button/Button';
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
				this.props.dispatch({
					type: 'DELETE_WORD_PENDING'
				})
				 await WordsApi.deleteWord(id);
				 this.props.dispatch({
					 type: 'DELETE_WORD_SUCCESS'
				 })
				 this.props.dispatch({
					 type: 'DELETE_WORD',
					 id
				 })
				 this.setState({isDeleted: true});
			}
			catch(error) {
				console.error(error);
				this.props.dispatch({
					type: 'DELETE_WORD_ERROR',
					error
				})
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

				{!this.state.isDeleted ? <div><Button variant='danger' value='Delete' onClick={this.handleDelete} /></div> : null}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return { 
		words: state.getWordsReducer.words,
		delete: state.deleteWordReducer
	}
 }
export default connect(mapStateToProps)(Tile);
