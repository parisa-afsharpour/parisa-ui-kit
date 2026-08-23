import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FontAwesome from "react-fontawesome";




class FontIcon extends Component {
    static propTypes = {
        /**
         * font color of the font icon
         */
        color: PropTypes.string,
        /**
         * The icon name.
         */
        icon: PropTypes.string,
        /**
         * Override the inline-styles of the root element.
         */
        style: PropTypes.object,
        /**
         * the size of icon element
         * */
        size: PropTypes.oneOf(['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']),
    };

    static defaultProps = {
        size: 'lg',
        color: '#333',
        icon: ''
    }

    render() {
        const {
            color,
            style,
            icon,
            size,
        } = this.props;
        return (
            <FontAwesome style={{color:color,...style}} name={icon} size={size}/>
            /*<FontAwesomeIcon color={color}
                             style={style}
                             icon={icon}
                             size={size}/>*/
        );
    }
}

export default FontIcon;