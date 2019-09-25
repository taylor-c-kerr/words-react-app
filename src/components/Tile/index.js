import React from 'react';
import Definition from './components/Definition/index';
import Name from './components/Name/index';

class Tile extends React.Component {
	constructor(props) {
	  super(props);
	}

	render() {
		return (
			<div>
				<Name name={this.props.name} />
				<Definition definition={this.props.definition} />
			</div>
		)
	}
}

export default Tile;
