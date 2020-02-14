import React from 'react';
import './styles.css';

class Entry extends React.Component {
	render() {
		const {number, entry} = this.props;
		return(
			<div className='entry'>{number}. {entry}</div>
		)
	}
}

export default Entry;
