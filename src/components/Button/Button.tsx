import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const ButtonPropTypes = {
  icon: PropTypes.string,
  text: PropTypes.string
}

type Props = PropTypes.InferProps<typeof ButtonPropTypes>

class Button extends React.Component<Props> {
  static propTypes: {};
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { icon, text } = this.props;
    
    return <button>
      {icon ? <span className="material-icons">{icon}</span> : ''}
      {text ? text : ''}
    </button>
  }
}

Button.propTypes = ButtonPropTypes;

export default Button;
