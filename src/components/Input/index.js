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
		const {index} = this.props;
		let data = {};
		data[name] = value;
		this.setState({value: value})
		this.props.updateValue(data, index)
	}

	componentDidMount() {
		this.setState({
			value: this.props.defaultValue
		})
	}

	render() {
		const {name} = this.props;
		const {value} = this.state;
		// const inputValue = this.state.value ? this.state.value : defaultValue;
		// console.log(value);

		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onChange} value={value}/>
			</div>
		)
	}
}

export default Input;