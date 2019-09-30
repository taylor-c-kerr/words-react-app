import React from 'react';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';
import WordsApi from '../../../../services/WordsApi/index';
import uuidv4 from 'uuid/v4';
import {Redirect} from 'react-router-dom'

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			definition: [],
			isSubmitted: false
		}

		this.getInputValue = this.getInputValue.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getInputValue(value) {
		if (value.definition) {
			// this.setState({definition: [value.definition]})
			console.log([value.definition]);
			value.definition = [value.definition];
		}
			this.setState(value);
		
	}

	async handleClick(e) {
		try {
			await WordsApi.postWord(this.state);
			this.setState({isSubmitted: true})
			
		}
		catch (error) {
			alert(error)
		}
	}

	render() {
		if (!this.state.id) {
			this.setState({id: uuidv4()})
		}

		if (this.state.isSubmitted) {
			return <Redirect push to='/' />;
		}

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