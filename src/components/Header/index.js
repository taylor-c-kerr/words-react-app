import React from 'react';
import moose from './images/happy-moose.png'
import './styles.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header>
        <img src={moose}/>
        <h1>Thoughtful Moose</h1>
      </header>
    );
  }
}

export default Header;
