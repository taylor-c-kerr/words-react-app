import React from 'react';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			definition: []
		}
	}

	render() {
		return (
			<div>HEY, I AM ABLE TO ADD A WORD NOW!!! WOOT!</div>
		)
	}
}

export default Add;