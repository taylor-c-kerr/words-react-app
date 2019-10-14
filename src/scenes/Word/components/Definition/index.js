import React from 'react';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';

class Definition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			definition: []
		};
		this.getValue = this.getValue.bind(this);
		this.addDefinition = this.addDefinition.bind(this);
		// this.deleteDefinition = this.deleteDefinition.bind(this, value, index);
	}

	componentDidMount() {
		const {definition} = this.props;
		this.setState({
			definition: definition
		})
	}
	
	getValue(value, index) {
		let {definition} = this.state;
		definition[index] = value.definition;
		this.setState({
			definition: definition
		})
		this.props.sendDefinitions(definition);
	}

	addDefinition() {
		const {definition} = this.state;
		this.setState({
			definition: [...definition, '']
		})
		this.props.sendDefinitions(definition);
	}

	deleteDefinition(value, index) {
		let {definition} = this.state;
		definition = definition.filter(def => def !== value);
		this.setState({definition: definition});
		this.props.sendDefinitions(definition);
	}

	render() {
		const {definition} = this.state;

		return (
			<div>
				{
					definition.map((def, i) => {
						return <div>
							<Input 
								name='definition' 
								updateValue={this.getValue} // getting the <input> value from the child component
								value={def} 
								index={i} 
								key={`def-input-${i}`}
								canBeDeleted={true}
								onDeleteClick={this.deleteDefinition.bind(this, def, i)}
							/>
						</div>	
					})
				}
				<Button onClick={this.addDefinition} value='add definition' />
			</div>
		)
	}
}

export default Definition;