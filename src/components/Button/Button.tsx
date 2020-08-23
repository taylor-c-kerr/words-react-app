import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const ButtonPropTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  hoverText: PropTypes.string,
}

type Props = PropTypes.InferProps<typeof ButtonPropTypes>

class Button extends React.Component<Props> {
  static propTypes: {};
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.clickHandler();
  }
  render() {
    const { icon, text, clickHandler, hoverText } = this.props;
    
    return (
      <div className="button-container">
        <button onClick={clickHandler} className={hoverText ? 'has-hover-text' : ''}>
          {icon ? <span className="material-icons">{icon}</span> : ''}
          {text ? text : ''}
        </button>
        {!hoverText ? '' : <div className="button-hover-text">{hoverText}</div>}
      </div>
    )
  }
}

Button.propTypes = ButtonPropTypes;

export default Button;
