import React from 'react';
import { Link } from 'react-router-dom';
import moose from './images/happy-moose.png';
import './styles.scss';

class Header extends React.Component {
	render() {
		return (
			<header>
				<Link to="/">
					<img className='image' src={moose} alt='Thoughtful Moose'/>
				</Link>
					<h1>Thoughtful Moose</h1>
			</header>
		);
	}
}

export default Header;
