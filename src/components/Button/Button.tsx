import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const ButtonPropTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  clickHandler: PropTypes.func.isRequired
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
    const { icon, text, clickHandler } = this.props;
    
    return <button onClick={clickHandler}>
      {icon ? <span className="material-icons">{icon}</span> : ''}
      {text ? text : ''}
    </button>
  }
}

Button.propTypes = ButtonPropTypes;

export default Button;
