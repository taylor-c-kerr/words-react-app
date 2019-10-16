import React from 'react';
import Input from '../../../../components/Input/index';
import Button from '../../../../components/Button/index';

class Definition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			definition: ['']
		}
		this.addDefinition = this.addDefinition.bind(this);
	}
	
	onUpdate(e) {
		const {id, value} = e.target;
		let newDef;
		this.setState(prevState => {
			let {definition} = prevState;

			newDef = definition.map((def, i) => i === parseInt(id) ? value : def)

			this.props.onDataUpdate(newDef)
			return {definition: newDef};
		})
	}

	addDefinition() {
		let {definition} = this.state;
		let newDef = definition;
		newDef.push('')
		this.props.onDataUpdate(newDef);
	}

	deleteDefinition(value, index) {
		let {definition} = this.props;
		definition = definition.filter(def => def !== value);
		this.props.onDataUpdate(definition);
	}

	componentDidMount() {
		const {definition} = this.props;

		this.setState({
			definition: definition
		})
	}

	displayDefinitionv1(definition) {
		definition.map((def, i) => {
			return <div>
				<Input 
					name='definition' 
					onUpdate={this.onUpdate} // getting the <input> value from the child component
					value={def} 
					index={i} 
					key={`def-input-${i}`}
					canBeDeleted={true}
					onDeleteClick={this.deleteDefinition.bind(this, def, i)}
				/>
			</div>	
		})
	}

	render() {
		const {definition} = this.state;
		return (
			<div>
				{
					definition.map((def, i) => {
						return <div key={`${i}`}>
							<input 
								onChange={this.onUpdate.bind(this)} 
								type='text' 
								value={def}
								id={i}
								// canBeDeleted={true} 
								// key={`input-def-${i}`}
							/>
							<br/>
						</div>
					})
				}
				<Button onClick={this.addDefinition} value='add definition' />
			</div>
		)
	}
}

export default Definition;