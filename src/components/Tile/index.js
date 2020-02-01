import React from 'react';
import { Redirect } from 'react-router-dom';
import Definition from './components/Definition/index';
import Name from './components/Name/index';
import Button from '../Button/index';
import WordsApi from '../../services/api/WordsApi';
import './styles.scss';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			isDeleted: false
		}

		this.handleClick = this.handleClick.bind(this);
		this.markAsDeleted = this.markAsDeleted.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClick(e) {
		this.setState({isClicked: true});
	}

	markAsDeleted(isDeletedFromChild) {
		if (isDeletedFromChild) {
			this.setState({isDeleted: true})
		}
	}

	async handleDelete() {
		const {id} = this.props;
		const toDelete = await window.confirm(`delete ${id}?`);
		if (toDelete) {
			this.setState({isDeleted: true});

			try{
				await WordsApi.deleteWord(id);
			}
			catch(error) {
				console.log(error);
				alert(error);
			}
		}
	}

	render() {
		const {isClicked, isDeleted} = this.state;
		if (isClicked) {
			const link = `/${this.props.id}`;
			return <Redirect push to={link} />; 
		}

		return (
			<div className={isDeleted ? 'deletedTile' : 'tile'}>
				<div onClick={this.handleClick}>
					<Name name={this.props.name} />
					<Definition definition={this.props.definition} key={this.props.id} />
				</div>

				<div onClick={this.handleDelete}><Button variant='danger' value='Delete' /></div>
			</div>
		)
	}
}

export default Tile;
