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
	}

	componentDidMount() {
		const {definition} = this.props;
		this.setState({
			definition: definition
		})
	}
	
	getValue(value, index) {
		let d = this.state.definition;
		d[index] = value.definition;
		this.setState({
			definition: d
		})
	}

	addDefinition() {
		const {definition} = this.state;
		this.setState({
			definition: [...definition, '']
		})
	}

	render() {
		const {definition} = this.state;

		return (
			<div>
				{
				definition.map((def, i) => {
					return <Input 
						name='definition' 
						updateValue={this.getValue} // getting the <input> value from the child component
						value={def} 
						index={i} 
						key={`def-input-${i}`}
					/>
				})
				}
				<Button onClick={this.addDefinition} value='add definition' />
			</div>
		)
	}
}

export default Definition;