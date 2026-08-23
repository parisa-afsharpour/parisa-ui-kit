import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import FontIcon from '../fontIcon/FontIcon';

const inlineStyles = {
    squareButton : {
        padding:'6px',
        border:'1px solid #e6e6e6',
        backgroundColor:'#e6e6e6',
        borderRadius:'4px',
        fontSize:'11px'
    },
    raptorIconButton:{
        display: 'inline-block',
        cursor: 'pointer',
        padding: '6px',
        textAlign: 'center',
    }
};

class IconButton extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        onClick: PropTypes.func,
        size: PropTypes.string,
        style: PropTypes.object,
        squareButton:PropTypes.bool,
        tooltip: PropTypes.string,
        tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
    };

    static defaultProps = {
        disabled: false,
        tooltip: '',
        tooltipPlacement: 'bottom',
        onClick: ()=>{},
        squareButton:false
    };

    render() {
        const{size}=this.props;
        const {
            disabled,
            tooltip,
            onClick,
            iconColor,
            tooltipPlacement,
            squareButton,
            style,
            ...other
        } = this.props;

        return (
                <Tooltip title={tooltip} placement={tooltipPlacement} trigger={['hover','click']}>
                    <span onClick={!disabled && onClick} style={{
                        ...inlineStyles.raptorIconButton,
                        ...style,
                        cursor: disabled ? 'not-allowed' : 'pointer'}}
                        >
                        <div style={squareButton ? {
                            padding:'6px',
                            border:'1px solid #e6e6e6',
                            backgroundColor:iconColor,
                            borderRadius:'4px',
                            fontSize:!size ?'11px' :size}
                            : {}}>
                            <FontIcon  {...other} color={disabled ? 'rgba(0,0,0,0.3)' : (squareButton ? '#fff' :iconColor)}/>
                        </div>
                    </span>
                </Tooltip>
            );
        }
}

export default(IconButton);
