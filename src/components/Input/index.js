import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		return (
			<input type='text'/>
		)
	}
}

export default Input;