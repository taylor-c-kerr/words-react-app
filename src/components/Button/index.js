import React from 'react';
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
		const {value, variant, onClick} = this.props;
		return (
			<Btn onClick={onClick} variant={[variant || 'primary']}>{value}</Btn>
		)
	}

}

export default Button;