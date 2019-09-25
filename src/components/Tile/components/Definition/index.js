import React from 'react';
import './styles.css';

class Definition extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='definition'>
        Definition: {this.props.definition}
      </div>
    );

  }
}

export default Definition;
