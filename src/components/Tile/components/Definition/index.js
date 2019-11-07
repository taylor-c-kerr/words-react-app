import React from 'react';
import PartOfSpeech from './components/PartOfSpeech/index';
import Entry from './components/Entry/index';
import './styles.css';

class Definition extends React.Component {
	render() {
		const {definition} = this.props;

		return(
		
			definition.map((def, i) => {
				const {partOfSpeech, entries} = def;
				return <div key={`definition-${i}`}>
					<PartOfSpeech partOfSpeech={partOfSpeech} />
					{entries.map((e,i) => {
						return <Entry entry={e} key={`entry-${i}`} number={i+1}/>
					})}
				</div>
			})
		)
	}
}

export default Definition;
