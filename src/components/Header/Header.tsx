import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moose from './images/happy-moose.png';
import './styles.scss';

const HeaderPropTypes = {
  addCurrentWord: PropTypes.func.isRequired,
  resetAvailablePos: PropTypes.func.isRequired,
}

type Props = PropTypes.InferProps<typeof HeaderPropTypes>;

class Header extends React.Component<Props> {
  static propTypes: {};

	onClick() {
		this.props.addCurrentWord({});
		this.props.resetAvailablePos();
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

Header.propTypes = HeaderPropTypes;

const mapDispatchToProps = (dispatch: any) => {
	return {
		addCurrentWord: (currentWord: any) => dispatch({ type: 'CURRENT_WORD_SUCCESS', currentWord }),
		resetAvailablePos: () => dispatch({ type: 'RESET_AVAILABLE_POS' }),
	}
}

export default connect(null, mapDispatchToProps)(Header);
