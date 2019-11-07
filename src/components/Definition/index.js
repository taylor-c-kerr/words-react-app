import React from 'react';
import Button from '../Button/index';
import PartOfSpeech from '../../components/PartOfSpeech/index';

class Definition extends React.Component {
	onDataUpdate(i, e) {
		const {value, type} = e.target;
		let {definition, number} = this.props;
		definition = Object.assign({}, definition);
		let entries = [...definition.entries];

		if (type === 'button' && value === '') {
			// we have clicked the add definition button
			entries.push(value);
		}
		else {
			entries[i] = value;
		}

		definition.entries = entries;
		this.props.onDataUpdate(definition, number);

	}

	render() {
		if (!this.props.definition) {
			return <div>LOADING...</div>
		}

		const {definition} = this.props;
		const {partOfSpeech, entries} = definition

		return (
			<div>
				<PartOfSpeech value={partOfSpeech} />
				{
					entries.map((def, i) => {
						return <div key={`entry-${i}`}>
							{`${i+1}. `}
							<input 
								onChange={this.onDataUpdate.bind(this, i)} 
								type='text' 
								value={def}
								placeholder='enter a new definition'
							/>
							<br/>
						</div>
					})
				}
				<Button onClick={ this.onDataUpdate.bind(this, -1) } variant='primary' value='add definition' />
			</div>
		)
	}
}

export default Definition;