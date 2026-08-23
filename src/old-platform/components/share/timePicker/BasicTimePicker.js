import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker as AntTimePicker } from 'antd';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import FormHelperText from "../formHelperText/FormHelperText";
import {uniqueId} from '../utils/utils';

class TimePicker extends React.Component {
    static propTypes = {
        disabledHours:PropTypes.func,
        disabledMinutes:PropTypes.func,
        disabledSeconds:PropTypes.func,
        onChange:PropTypes.func.isRequired,
        format:PropTypes.string,
        disabled:PropTypes.bool,
        value:PropTypes.object,
        mandatoryPresentational:PropTypes.bool,
        label:PropTypes.string,
        errorText:PropTypes.string,
        id:PropTypes.string,
    };

    static defaultProps = {
        format:'HH:mm',
        disabled:false
    };

    constructor(props){
        super(props);
        this.ELEMENT_ID =`${uniqueId()}-${props.id}`;
    }

    render() {
        const {
            value,
            disabled,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            format,
            onChange,
            mandatoryPresentational,
            errorText,
            label,
            id,
            placeholder,
            showSecond
        }=this.props;

        return(
            <div id={this.ELEMENT_ID}>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <AntTimePicker onChange={onChange}
                               format={format}
                               value={value}
                               id={id}
                               disabled={disabled}
                               disabledHours={disabledHours}
                               disabledMinutes={disabledMinutes}
                               disabledSeconds={disabledSeconds}
                               getPopupContainer={()=> document.getElementById(this.ELEMENT_ID)}
                               placeholder={placeholder}
                               showSecond={showSecond}
                />
                {label && <FormHelperText text={errorText} type={'error'} />}
            </div>
        )
    }

}
export default TimePicker;