import React from 'react';
import './styles.css';

class Name extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='name'>
        {this.props.name}
      </div>
    );

  }
}

export default Name;
