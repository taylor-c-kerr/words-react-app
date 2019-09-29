import React from 'react';
import Input from '../../../../components/Input/index'

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			definition: []
		}
		this.getInputValue = this.getInputValue.bind(this)
	}

	getInputValue(value) {
		this.setState(value);
	}

	render() {
		return (
			<div>
				<Input name='Name' value={this.getInputValue}/>
				<Input name='Definition' value={this.getInputValue}/>
			</div>
		)
	}
}

export default Add;