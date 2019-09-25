import React from 'react';
import Definition from './components/Definition/index';
import Name from './components/Name/index';
import './styles.css';

class Tile extends React.Component {
	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<div className='tile'>
				<Name name={this.props.name} />
				<Definition definition={this.props.definition}
				key={this.props.id} />
			</div>
		)
	}
}

export default Tile;
