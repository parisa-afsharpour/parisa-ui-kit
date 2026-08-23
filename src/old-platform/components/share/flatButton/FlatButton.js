import React from 'react';
import {Button, Tooltip} from 'antd';
import PropTypes from 'prop-types';
import FontIcon from '../fontIcon/FontIcon';
import GridTile from "../grid/Col";

const inlineStyles = {
    icon : { padding: 5,
        boxSizing: 'content-box',
        verticalAlign: 'middle' }
};

class FlatButton extends React.Component {
    static propsType = {
        disabled: PropTypes.bool,
        icon:PropTypes.string,
        iconConfig: PropTypes.shape({
            color: PropTypes.string,
            size: PropTypes.string,
        }),
        id: PropTypes.string,
        label:PropTypes.string,
        onClick:PropTypes.func,
        primary:PropTypes.bool,
        secondary:PropTypes.bool,
        style: PropTypes.object,
        tooltip: PropTypes.string
    };




    static defaultProps= {
        iconConfig: {}
    };

    render() {
        const {
            label,
            disabled,
            tooltip,
            id,
            onClick,
            icon,
            iconConfig,
            secondary,
            children,
            style
        } = this.props;
        return <Tooltip title={tooltip} placement={'bottom'}>
       <div>
           <Button
               id={id}
               disabled={disabled}
               onClick={onClick}
               type={secondary ? 'dashed' : ''}
               style={style}
           >
               { icon && <FontIcon icon={icon}
                                   style={inlineStyles.icon}
                                   {...iconConfig} /> }
               {label}
               {children}
           </Button>
       </div>
        </Tooltip>
    }
}

export default FlatButton;