import React from 'react';
import moose from './images/happy-moose.png'
import './styles.css';

class Header extends React.Component {  
  render() {
    return (
      <header>
        <img src={moose} alt='Thoughtful Moose'/>
        <h1>Thoughtful Moose</h1>
      </header>
    );
  }
}

export default Header;
