import React from 'react';
import './styles.scss';

class Footer extends React.Component<{}> {

  render() {
    const year = new Date().getFullYear();
    return (
      <footer>
        <p>{`© ${year} Thoughtful Moose`}</p>
      </footer>
    );
  }
}

export default Footer;
