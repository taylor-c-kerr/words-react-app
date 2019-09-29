import React from 'react';

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			isClicked: false
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		this.setState({
			isClicked: true
		})
		this.props.onClick()
	}

	render() {
		return (
			<button onClick={this.handleClick} type='button'>{this.props.value}</button>
		)
	}

}

export default Button;