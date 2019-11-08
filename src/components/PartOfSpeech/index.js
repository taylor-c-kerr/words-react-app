import React from 'react';
import Input from '../Input/index';

class Name extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {value} = this.props;
		let c = value ? <h3>{value}</h3> : <Input type='partOfSpeech' placeholder='part of speech' value={value} onDataUpdate={(data) => this.props.onDataUpdate(data)}/>
		return c;
	}
}

export default Name;