import React from 'react';
import './styles.css';

class PartOfSpeech extends React.Component {
	render() {
		const {partOfSpeech} = this.props;
		return(
			<div className='partOfSpeech'>{partOfSpeech}</div>
		)
	}
}

export default PartOfSpeech;
