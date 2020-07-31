import React from 'react';
import PartOfSpeech from '../PartOfSpeech/PartOfSpeech';

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

	mapEntries = (entries) => {
		return entries.map((def, i) => {
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

	render() {
		if (!this.props.definition) {
			return <div>LOADING...</div>
		}

		const {definition} = this.props;
		const {partOfSpeech, entries} = definition;

		return (
			<div>
				<PartOfSpeech value={partOfSpeech} onDataUpdate={this.onDataUpdate.bind(this)}/>
				{ this.mapEntries(entries) }
				{/* blue button with round corners: */}
				<button onClick={this.onDataUpdate.bind(this, {})}>Add Entry</button>
			</div>
		)
	}
}

export default Definition;