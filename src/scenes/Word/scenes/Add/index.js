import React from 'react';
import Input from '../../../../components/Input/index';
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
		this.addDefinition = this.addDefinition.bind(this);
	}

	getInputValue(value, index=null) {
		if ('definition' in value) {
			let {definition} = this.state;
			definition[index] = value.definition;
			this.setState({definition: definition})
		}
		else {
			this.setState(value);
		}

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

	addDefinition() {
		const {definition} = this.state

		this.setState({
			definition: [...definition, '']
		})
	}

	render() {
		const {isSubmitted, definition} = this.state;

		if (isSubmitted) {
			return <Redirect push to='/' />;
		}

		return (
			<div>
				<Input name='name' updateValue={this.getInputValue}/>
				{definition.map((def,i) => <Input name='definition' updateValue={this.getInputValue} defaultValue={def} index={i} key={`def-input-${i}`}/>)}
				<Button onClick={this.addDefinition} value='add definition' />
				<Button onClick={this.handleSubmit} value='save' />
			</div>
		)
	}
}

export default Add;