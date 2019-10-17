import React from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from 'react-bootstrap/Button';

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
	}

	render() {
		const {value, variant} = this.props;
		return (
			// <button onClick={this.handleClick} type='button'>{this.props.value}</button>
			<Btn 
				onClick={this.handleClick}
				variant={[variant || 'primary']}
			 >
			{value}
			</Btn>
		)
	}

}

export default Button;