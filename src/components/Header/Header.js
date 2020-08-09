import React from 'react';
import { Link } from 'react-router-dom';
import moose from './images/happy-moose.png';
import './styles.scss';
import { connect } from 'react-redux';

class Header extends React.Component {
	onClick() {
		this.props.addCurrentWord({})
	}
	render() {
		return (
			<header>
				<Link to="/" onClick={this.onClick.bind(this)}>
					<img className='image' src={moose} alt='Thoughtful Moose'/>
				</Link>
					<h1>Thoughtful Moose</h1>
			</header>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addCurrentWord: (currentWord) => dispatch({ type: 'CURRENT_WORD_SUCCESS', currentWord }),
	}
}

export default connect(null, mapDispatchToProps)(Header);
