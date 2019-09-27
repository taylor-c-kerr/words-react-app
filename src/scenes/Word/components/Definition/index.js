import React from 'react';

class Definition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {definition} = this.props;
		return (
			definition.map((def, i) => {
				return <div key={i}>{def}</div>
			})
		)
	}
}

export default Definition;