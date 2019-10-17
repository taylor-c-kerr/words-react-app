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
		this.getWord()
	}

	async getWord() {
		const {id} = this.props.match.params;

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

	onDataUpdate(data) {
		this.setState(prevState => {
			let updatedWord = Object.assign({}, prevState.word);
			updatedWord.definition = data.filter(d => d !== '');

			return {
				word: updatedWord,
				hasBeenEdited: !_.isEqual(this._originalWord, updatedWord)
			};
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
				<Definition definition={word.definition} onDataUpdate={this.onDataUpdate}/>
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