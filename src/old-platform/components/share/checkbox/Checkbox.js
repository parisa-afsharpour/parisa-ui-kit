import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as AntCheckbox } from 'antd';
import FormControlLabel from '../formControlLabel/FormControlLabel';

const inlineStyles = {
    label: {margin: '10px 2px 10px 2px', display: 'inline',fontWeight:500},
    parentCheckbox: {width: '100%', position: 'relative'},
    height:{ height: '55px',margin: '0px auto 15px',}
};

class Checkbox extends React.Component {

    static propTypes = {
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        onCheck: PropTypes.func,
        style: PropTypes.object
    };

    handleCheck = (event) => {
        const {checked} = event.target;
        if (this.props.onCheck) {
            this.props.onCheck(event, checked);
        }
    };

    render() {
        const {
            label,
            disabled,
            defaultChecked,
            checked,
            style,
            withOutHeight,
            ...props
        } = this.props;

        return (
            <div style={  Object.assign(inlineStyles.parentCheckbox ,withOutHeight ? {} : inlineStyles.height) }>
                <AntCheckbox
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={this.handleCheck}
                    checked={checked}
                    style={style}
                    className='container'
                    {...props}
                >{Boolean(label) && (<FormControlLabel label={label} style={inlineStyles.label}/>)}
                </AntCheckbox>
            </div>)
    }
}

export default Checkbox;