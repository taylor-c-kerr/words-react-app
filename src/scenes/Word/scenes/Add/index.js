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
			definition: [''],
			isSubmitted: false
		}

		this.getInputValue = this.getInputValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.displayDefinition = this.displayDefinition.bind(this);
	}

	getInputValue(value, index=null) {
		if (value.definition) {
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
			await WordsApi.postWord(this.state);
			this.setState({isSubmitted: true})
		}
		catch (error) {
			alert(error)
		}
	}

	displayDefinition(defs) {
		// console.log(defs);
		return defs.map((def, i) => {
			return <Input name='definition' updateValue={this.getInputValue} defaultValue={def} index={i}/>
		})
	}

	render() {
		const {id, isSubmitted, definition} = this.state;
		if (!id) {
			this.setState({id: uuidv4()})
		}

		if (isSubmitted) {
			return <Redirect push to='/' />;
		}

		return (
			<div onSubmit={this.handleSubmit}>
				<Input name='name' updateValue={this.getInputValue}/>
				{/*<Input name='definition' value={this.getInputValue}/>*/}
				{this.displayDefinition(definition)}
				<Button onClick={() => this.setState({definition: [...definition, '']})} value='add definition' />
				<Button onClick={this.handleSubmit} value='save' />
			</div>
		)
	}
}

export default Add;