import React from 'react';
import Button from '../Button/index';
import PartOfSpeech from '../../components/PartOfSpeech/index';

class Definition extends React.Component {
	onDataUpdate(data, e) {
		let {definition, number} = this.props;
		definition = Object.assign({}, definition);

		if (typeof data === 'number') {
			// update entry
			const {value, type} = e.target
			const entries = [...definition.entries];
			entries[data] = value;
			definition.entries = entries;
		}
		else if (data.hasOwnProperty('partOfSpeech')) {
			// add part of speech
			const {partOfSpeech} = data;
			definition.partOfSpeech = partOfSpeech
		}
		else {
			// add blank entry
			let entries = [...definition.entries];
			entries.push('');
			definition.entries = entries;
		}

		// definition.number = number;

		this.props.onDataUpdate(definition, number);
	}

	render() {
		if (!this.props.definition) {
			return <div>LOADING...</div>
		}

		const {definition} = this.props;
		const {partOfSpeech, entries} = definition;

		return (
			<div>
				<PartOfSpeech value={partOfSpeech} onDataUpdate={this.onDataUpdate.bind(this)}/>
				{
					entries.map((def, i) => {
						return <div key={`entry-${i}`}>
							{`${i+1}. `}
							<input 
								onChange={this.onDataUpdate.bind(this, i)} 
								type='text' 
								value={def}
								placeholder='Enter a new definition'
							/>
							<br/>
						</div>
					})
				}
				<Button onClick={this.onDataUpdate.bind(this, {})} variant='primary' value='add entry' />
			</div>
		)
	}
}

export default Definition;