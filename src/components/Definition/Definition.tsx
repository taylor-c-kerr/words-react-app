import React from 'react';
import PropTypes from 'prop-types';
import PartOfSpeech from '../PartOfSpeech/PartOfSpeech';
import Button from '../Button/Button';
import { cloneDeep } from 'lodash';
import './definition.scss';

const DefinitionPropTypes = {
  definition: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
	onDataUpdate: PropTypes.any.isRequired,
	isNewWord: PropTypes.bool.isRequired,
}

type Props = PropTypes.InferProps<typeof DefinitionPropTypes>;
class Definition extends React.Component<Props> {
  static propTypes: {};

  onDataUpdate(data: any, e: any) {
		let {definition, number} = this.props;
    definition = cloneDeep(definition);
    
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

	mapEntries(entries: Array<any>) {
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

		const { definition, isNewWord } = this.props;
		const { partOfSpeech, entries } = definition;

		return (
			<div className="definition">
				<PartOfSpeech value={partOfSpeech} onOptionChange={this.onDataUpdate.bind(this)} isNewWord={isNewWord} />
				{ this.mapEntries(entries) }
				<Button icon="add" hoverText="Add Entry" hoverDirection="right" clickHandler={this.onDataUpdate.bind(this, {})}/>
			</div>
		)
	}
}

Definition.propTypes = DefinitionPropTypes;

export default Definition;
