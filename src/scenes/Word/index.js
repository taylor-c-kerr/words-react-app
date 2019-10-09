import React from 'react';
import WordsApi from '../../services/api/WordsApi/index';
import Name from './components/Name/index';
import Definition from './components/Definition/index';
import CloseButton from '../../components/CloseButton/index.js';
import {Redirect} from 'react-router-dom';
// import AddWordButton from '../../components/AddWordButton/index.js';

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			word: null,
			error: false,
			isInEditMode: false
		}
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

	handleClick(e) {
		this.setState({
			isInEditMode: true
		})
	}

	render() {
		const {word, isLoaded, error, isInEditMode} = this.state;

		if (isInEditMode) {
			return <Redirect push to={`/word/${this.props.match.params.id}/edit`} />
		}

		const content = error ? <div>THERE WAS AN ERROR</div> 
		: !isLoaded ? <div>LOADING...</div> 
		: <div><Name name={word.name} /><Definition definition={word.definition} /></div>;

		return <div>
			{content}
			{
				!isInEditMode ? <button onClick={this.handleClick.bind(this)}>EDIT</button>
				: <button>SAVE</button>
			}
			<CloseButton />
		</div>
	}
}

export default Word;