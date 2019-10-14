import React from 'react';
import { Redirect } from 'react-router-dom';
import WordsApi from '../../services/api/WordsApi';

class DeleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClicked: false,
			deleted: false
		}
	}

	async handleClick(id, e) {
		const toDelete = await window.confirm(`delete ${id}?`);

		if (toDelete) {
			this.setState({
				isClicked: true,
				deleted: true
			});

			await WordsApi.deleteWord(id);
			this.props.markAsDeleted(toDelete);
		}
	}

	render() {
		const id= this.props.id;
		if (this.state.isClicked) {
			return <Redirect push to='/' />
		}
		return <div onClick={this.handleClick.bind(this, id)}>X - Delete</div>
	}

}

export default DeleteButton;