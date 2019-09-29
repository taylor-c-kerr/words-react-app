import React from 'react';
import { Redirect } from 'react-router-dom';

class AddWordButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({isClicked: true})
	}
	render() {
		if (this.state.isClicked) {
			return <Redirect push to='/add' />
		}
		return <div onClick={this.handleClick}>ADD WORD</div>
	}
}

export default AddWordButton;