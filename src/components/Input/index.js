import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const {name, value} = e.target;
		let data = {};
		data[name] = value;
		this.setState({value: value})
		this.props.value(data)
	}

	render() {
		const {name} = this.props;
		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onChange}/>
			</div>
		)
	}
}

export default Input;