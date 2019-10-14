import React from 'react';
import Input from '../../../../components/Input/index';
import Definition from '../../components/Definition/index';
import Button from '../../../../components/Button/index';
import WordsApi from '../../../../services/api/WordsApi/index';
import {Redirect} from 'react-router-dom'
import Validate from '../../../../services/validation/index'

class Add extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			definition: [''],
			isSubmitted: false,
			inputValue: ''
		}

		this.getInputValue = this.getInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getUpdatedDefinitions = this.getUpdatedDefinitions.bind(this);
	}

	getUpdatedDefinitions(newDefinition) {
		newDefinition = newDefinition.filter(def => def !== '');
		this.setState({
			definition: newDefinition
		})
	}

	getInputValue(value) {
		this.setState(value);
	}

	async handleSubmit(e) {
		try {
			const data = Validate.form(this.state);
			await WordsApi.postWord(data);
			this.setState({isSubmitted: true})
		}
		catch (error) {
			console.log(error);
			alert(error)
		}
	}

	render() {
		const {isSubmitted, definition} = this.state;

		if (isSubmitted) {
			return <Redirect push to='/' />;
		}

		return (
			<div>
				<Input name='name' updateValue={this.getInputValue}/>
				<Definition definition={definition} sendDefinitions={this.getUpdatedDefinitions}/>
				<Button onClick={this.handleSubmit} value='save' />
			</div>
		)
	}
}

export default Add;