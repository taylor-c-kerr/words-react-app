import logo from './moose-logo-small.png';
import './styles.scss';
import React from 'react';

class LoadingIcon extends React.Component {
    render() {
        return <img className='loadingIcon' src={logo} alt='Loading'/>
    }
}

export default LoadingIcon;