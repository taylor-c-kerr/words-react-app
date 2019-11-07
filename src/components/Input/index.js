import React from 'react';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.onDataUpdate = this.onDataUpdate.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	onDataUpdate(e) {
		const {index} = this.props;
		const {type, value} = e.target;
		let data = {[type]: value};

		this.props.updateValue(data, index)
	}

	handleClick(e) {
		const {canBeDeleted} = this.props;
		if (canBeDeleted) {
			this.props.onDeleteClick()
		}
	}

	render() {
		const {type, canBeDeleted, value} = this.props;

		return (
			<div>
				<input
					placeholder={`Enter a new ${type}`}
					name={type}
					type='text'
					onChange={this.onDataUpdate}
					value={value}
				/>
				
				{canBeDeleted ? <button onClick={this.handleClick} className='deleteButton'>Delete</button> : null}
			</div>
		)
	}
}

export default Input;