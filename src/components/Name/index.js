import React from 'react';
import Input from '../Input/index';

class Name extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {value} = this.props;
		let c = value ? <h2>{value}</h2> : <Input type='name' value={value} />
		return c;
	}
}

export default Name;