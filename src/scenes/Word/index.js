import React from 'react';
import WordsApi from '../../services/WordsApi/index';

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
	  try {
	  	const {id} = this.props.match.params;
	    const word = await WordsApi.getWord(id);
	    this.setState({
	      isLoaded: true,
	      error: false,
	      word: word.data
	    })
	  }
	  catch (error) {
	    this.setState({
	      error: error
	    })
	  }
	}

	render() {
		const {word, isLoaded, error} = this.state;

		if (!isLoaded) {
		  return <div>LOADING...</div>
		}
		if (error) {
		  return <div>{error}</div>
		}

		return <div>
			<h2>{word.name}</h2>
		</div>
	}
}

export default Word;