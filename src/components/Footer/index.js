import React from 'react';
import './styles.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <footer>
        <p>© 2019 Thoughtful Moose</p>
      </footer>
    );
  }
}

export default Footer;
