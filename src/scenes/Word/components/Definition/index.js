import React from 'react';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';

class Definition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasChanged: false
		};
		this.getValue = this.getValue.bind(this);
		this.addDefinition = this.addDefinition.bind(this);
	}
	
	getValue(value, index=null) {
		let {definition} = this.state;
		definition[index] = value.definition;
		console.log(definition);
		const hasChanged = !definition.every(d => this.props.definition.includes(d));

		this.setState({
			hasChanged: hasChanged
		})

		this.props.sendDefinitions(definition)
	}

	addDefinition() {
		const {hasChanged} = this.state;
		let definition;
		if (this.state.definition) {
			definition = this.state.definition;
		}
		else {
			definition = this.props.definition;
		}

		this.setState({
			definition: [...definition, '']
		})
	}

	render() {
		const {definition} = this.state.definition ? this.state : this.props;
		const {hasChanged} = this.state;

		const definitions = definition.map((def, i) => {
			return <Input 
				name='definition' 
				updateValue={this.getValue} // getting the <input> value from the child component
				value={def} 
				index={i} 
				key={`def-input-${i}`}
			/>
		})

		return (
			<div>
				<div>{hasChanged ? <div>SAVE</div> : null}</div>
				<div>{definitions}</div>
				<Button onClick={this.addDefinition} value='add definition' />
			</div>
		)
	}
}

export default Definition;