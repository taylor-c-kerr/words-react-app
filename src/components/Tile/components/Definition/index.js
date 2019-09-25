import React from 'react';

class Definition extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        Definition: {this.props.definition}
      </div>
    );

  }
}

export default Definition;
