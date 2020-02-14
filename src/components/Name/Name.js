import React from 'react';
import Input from '../Input/Input';

class Name extends React.Component {
	render() {
		const {value} = this.props;
		let c = <Input type='name' value={value} placeholder='name' onDataUpdate={(data) => this.props.onDataUpdate(data)}/>
		return c;
	}
}

export default Name;