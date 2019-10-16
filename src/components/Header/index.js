import React from 'react';
import { Redirect } from 'react-router-dom';
import moose from './images/happy-moose.png'
import './styles.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		}
		this.redirect = this.redirect.bind(this);
	}

	resetRedirect() {
		this.setState(prevState => {
			return {redirect: false}
		})
		return <Redirect push to='/' />;
	}

	redirect(e) {
		this.setState(prevState => {
			return {redirect: !prevState.redirect}
		})
	}

	render() {
		const {redirect} = this.state;
		if (redirect === true) {
			return this.resetRedirect();
		}

		return (
			<div onClick={this.redirect}>
				<header>
					<img src={moose} alt='Thoughtful Moose'/>
					<h1>Thoughtful Moose</h1>
				</header>
			</div>
		);
	}
}

export default Header;
