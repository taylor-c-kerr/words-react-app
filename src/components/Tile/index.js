import React from 'react';
import { Redirect } from 'react-router-dom';
import Definition from './components/Definition/index';
import Name from './components/Name/index';
import './styles.css';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({isClicked: true});
	}

	render() {
		const {isClicked} = this.state;
		if (isClicked) {
			const link = `/${this.props.id}`;
			return <Redirect push to={link} />; 
		}

		return (
			<div className='tile' onClick={this.handleClick}>
				<Name name={this.props.name} />
				<Definition definition={this.props.definition}
				key={this.props.id} />
			</div>
		)
	}
}

export default Tile;
