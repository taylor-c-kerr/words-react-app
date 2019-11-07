import React from 'react';
import Input from '../Input/index';

class Name extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {value} = this.props;
		let c = value ? <h3>{value}</h3> : <Input type='part of speech' value={value} />
		return c;
	}
}

export default Name;