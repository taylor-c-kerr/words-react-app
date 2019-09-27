import React from 'react';

class Name extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <h2>{this.props.name}</h2>;
	}
}

export default Name;