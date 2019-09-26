import React from 'react';

class Word extends React.Component {
	constructor(props) {
	  super(props);
	}

	async componentDidMount() {
	  try {
	    const word = await WordsApi.getWord(this.props.match.params.id);
	    this.setState({
	      isLoaded: true,
	      error: null,
	      words: words.data
	    })
	  }
	  catch (error) {
	    this.setState({
	      error: error
	    })
	  }
	}

	render() {
		const {id} = this.props.match.params
		return <div>You are looking at {id}</div>
	}
}

export default Word;