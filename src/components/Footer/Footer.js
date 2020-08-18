import React from 'react';
import './styles.scss';

class Footer extends React.Component {

  constructor() {
    super();
    this.year = new Date().getFullYear();
  }

  render() {
    return (
      <footer>
        <p>{`© ${this.year} Thoughtful Moose`}</p>
      </footer>
    );
  }
}

export default Footer;
