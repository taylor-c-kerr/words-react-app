import React from 'react';

class Name extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        Name: {this.props.name}
      </div>
    );

  }
}

export default Name;
