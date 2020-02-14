import React from 'react';
import './styles.scss';

class Name extends React.Component {  
  render() {
    return (
      <div className='name'>
        {this.props.name}
      </div>
    );

  }
}

export default Name;