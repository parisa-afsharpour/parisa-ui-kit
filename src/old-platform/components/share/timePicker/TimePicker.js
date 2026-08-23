import * as React from 'react';
import BaseTimePicker from './BasicTimePicker';
import { convertNumbers2English, stringToMoment } from '../utils/datetime';
import {validate} from "../form/FormValidation";

class TimePicker extends React.Component{
    constructor (props){
        super(props);
        if (props.validatorRegistrar) {
            this.validateTimeValue = this.validateTimeValue.bind(this);
            props.validatorRegistrar(this.validateTimeValue);
        }
    }

    validateTimeValue(dateValue, formValidation) {
        let validateResult = { isValid: true };
        if (formValidation) {
            validateResult = validate(dateValue, formValidation);
        }
        return validateResult;
    }
    
    onChange=(_time, timeStr)=>{
        const {onChange}=this.props;
        if(onChange){
            onChange(convertNumbers2English(timeStr));
        }
    };

    render (){
        const {value,mandatoryPresentational, calendar ,placeholder,showSecond}=this.props;
        const format=showSecond?'HH:mm:ss':'HH:mm';
        const stringTime= convertNumbers2English(value.replace(/-/g, '/'));

        return(
            <BaseTimePicker onChange={this.onChange}
                         value={stringToMoment(stringTime, calendar, format)}
                         label={this.props.label}
                         id={this.props.id}
                         disabled={this.props.disabled}
                         errorText={this.props.errorText}
                         format={format}
                         mandatoryPresentational={mandatoryPresentational}
                         placeholder={placeholder}
                            showSecond={showSecond}
            />
        );
    }
}

export default TimePicker;