import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null
		}

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const {name, value} = e.target;
		const {index} = this.props;
		let data = {};
		data[name] = value;
		this.setState({value: value})
		this.props.updateValue(data, index)
	}

	render() {
		const {name, defaultValue} = this.props;
		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onChange} value={this.state.value? this.state.value : defaultValue}/>
			</div>
		)
	}
}

export default Input;