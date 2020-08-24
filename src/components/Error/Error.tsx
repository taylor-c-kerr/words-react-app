import React from 'react';
import image from './sad-moose.png';
import './styles.scss';

class Error extends React.Component {  
  render() {
    return (
      <div className='image-container'>
        <h2>UH OH...</h2>
        <div>Something went wrong.</div>
        <img src={image} className='sad-moose' alt='Sad moose' />
      </div>
    );
  }
}

export default Error;
