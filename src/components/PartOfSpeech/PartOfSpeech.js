import React from 'react';
import Input from '../Input/Input';

class PartOfSpeech extends React.Component {
	render() {
		const {value} = this.props;
		let c = <Input type='partOfSpeech' placeholder='part of speech' value={value} onDataUpdate={(data) => this.props.onDataUpdate(data)}/>
		return c;
	}
}

export default PartOfSpeech;