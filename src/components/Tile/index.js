import React from 'react';
import { Redirect } from 'react-router-dom';
import Definition from './components/Definition/index';
import Name from './components/Name/index';
import DeleteButton from '../DeleteButton/index';
import './styles.css';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			isDeleted: false
		}

		this.handleClick = this.handleClick.bind(this);
		this.markAsDeleted = this.markAsDeleted.bind(this);
	}

	handleClick(e) {
		this.setState({isClicked: true});
	}

	markAsDeleted(isDeletedFromChild) {
		if (isDeletedFromChild) {
			this.setState({isDeleted: true})
		}
	}

	render() {
		const {isClicked, isDeleted} = this.state;
		if (isClicked) {
			const link = `/word/${this.props.id}`;
			return <Redirect push to={link} />; 
		}

		return (
			<div className={isDeleted ? 'deletedTile' : 'tile'}>
				<div onClick={this.handleClick}>
					<Name name={this.props.name} />
					<Definition definition={this.props.definition}
					key={this.props.id} />
				</div>

				<DeleteButton id={this.props.id} markAsDeleted={this.markAsDeleted} />
			</div>
		)
	}
}

export default Tile;
