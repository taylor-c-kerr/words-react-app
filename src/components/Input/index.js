import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.onUpdate = this.onUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	onUpdate(e) {
		const {index} = this.props;
		const {name, value} = e.target;
		let data = {[name]: value};

		this.props.updateValue(data, index)
	}

	handleClick(e) {
		const {canBeDeleted} = this.props;
		if (canBeDeleted) {
			this.props.onDeleteClick()
		}
	}

	render() {
		const {name, canBeDeleted, value} = this.props;

		return (
			<div>
				<label>{name.toUpperCase()}: </label>
				<input name={name} type='text' onChange={this.onUpdate} value={value} />
				{canBeDeleted ? <button onClick={this.handleClick} className='deleteButton'>Delete</button> : null}
			</div>
		)
	}
}

export default Input;