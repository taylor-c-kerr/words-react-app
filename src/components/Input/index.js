import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		const {value} = this.props;
		this.setState({value: value})
	}

	async onChange(e) {
		const {index} = this.props;
		const {name, value} = e.target;

		let data = {[name]: value};
		await this.setState({value:value})
		await this.props.updateValue(data, index)
	}

	render() {
		const {name} = this.props;
		const {value} = this.state;

		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onChange} value={value} />
			</div>
		)
	}
}

export default Input;