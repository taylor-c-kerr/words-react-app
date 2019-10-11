import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const {name, value} = e.target;
		const {index} = this.props;
		let data = {};
		data[name] = value;
		this.props.updateValue(data, index)
	}

	render() {
		const {name, value} = this.props;

		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onChange} value={value}/>
			</div>
		)
	}
}

export default Input;