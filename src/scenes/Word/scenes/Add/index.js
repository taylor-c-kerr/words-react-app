import React from 'react';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			definition: []
		}

		this.getInputValue = this.getInputValue.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getInputValue(value) {
		this.setState(value);
	}

	handleClick(e) {
		alert('SUBMITTED!');
	}

	render() {
		return (
			<div onSubmit={this.handleSubmit}>
				<Input name='name' value={this.getInputValue}/>
				<Input name='definition' value={this.getInputValue}/>
				<Button onClick={this.handleClick} value='save' />
			</div>
		)
	}
}

export default Add;