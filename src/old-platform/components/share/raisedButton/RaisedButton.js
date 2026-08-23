import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class RaisedButton extends React.Component {

  static propTypes = {
      /**
       * If true, the button will be disabled.
       */
      disabled: PropTypes.bool,
      /**
       * An icon to be displayed within the button.
       */
      icon: PropTypes.string,
      /**
       * If true, the button will use the theme's primary color.
       */
      id: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
      type: PropTypes.string,
      style: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    const {
        label,
        disabled,
        id,
        onClick,
        icon,
        type,
        children,
        style,
        className
    } = this.props;
    return (
        <Button
             id={id}
             disabled={disabled}
             onClick={onClick}
             icon={icon}
             type={type}
             style={style}
            className={className}
        >
            {label}
          {children}
        </Button>
    );
  }
}

export default RaisedButton;
