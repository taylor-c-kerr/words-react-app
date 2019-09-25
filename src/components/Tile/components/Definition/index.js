import React from 'react';
import './styles.css';

class Definition extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {definition} = this.props;
    return (
      <div className='definition'>
        Definition: {definition.map(def => <div>{def}</div>)}
      </div>
    );

  }
}

export default Definition;
