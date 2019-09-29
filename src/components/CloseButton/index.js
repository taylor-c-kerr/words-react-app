import React from 'react';
import { Redirect } from 'react-router-dom';

class CloseButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log(e);
		this.setState({isClicked: true});
	}

	render() {
		if (this.state.isClicked) {
			return <Redirect push to='/' />
		}
		return <div onClick={this.handleClick}>CLOSE ME, GO BACK, GO HOME</div>
	}
}

export default CloseButton;