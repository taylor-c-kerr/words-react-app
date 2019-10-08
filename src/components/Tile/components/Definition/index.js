import React from 'react';
import './styles.css';

class Definition extends React.Component {
  render() {
    const {definition} = this.props;
    return (
      <div className='definition'>
        Definition: {definition.map((def, i) => <div key={i}>{def}</div>)}
      </div>
    );

  }
}

export default Definition;
