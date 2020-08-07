import React from 'react';
import PartOfSpeech from '../PartOfSpeech/PartOfSpeech.tsx';
import Button from '../Button/Button';

class Definition extends React.Component {
	onDataUpdate(data, e) {
		console.log(data)
		let {definition, number} = this.props;
		definition = Object.assign({}, definition);

		if (typeof data === 'number') {
			// update entry
			const {value} = e.target
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
				<PartOfSpeech value={partOfSpeech} onOptionChange={this.onDataUpdate.bind(this)} />
				{ this.mapEntries(entries) }
				<Button icon="add" text="Add Entry" clickHandler={this.onDataUpdate.bind(this, {})}/>
			</div>
		)
	}
}

export default Definition;