import React from 'react';
import WordsApi from '../../services/WordsApi/index';
import Name from './components/Name/index';
import Definition from './components/Definition/index';
import CloseButton from '../../components/CloseButton/index.js';

class Word extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			word: null,
			error: false
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

	render() {
		const {word, isLoaded, error} = this.state;

		const content = error ? <div>THERE WAS AN ERROR</div> 
		: !isLoaded ? <div>LOADING...</div> 
		: <div><Name name={word.name} /><Definition definition={word.definition} /></div>;

		return <div>
			{content}
			<CloseButton />
		</div>
	}
}

export default Word;