import * as React from 'react';
import { connect } from 'react-redux';
import  BasicRangeDatePicker from './BasicRangeDatePicker';
import {
    convertNumbers2English,
    stringToMoment,
    jalaaliToGregorian,
    gregorianToJalaaliDate,
} from '../utils/datetime';
import { validate } from '../form/FormValidation';
import { isObject } from '../utils/utils';

export const calendars ={
    JALAALI : "jalaali",
    GREGORIAN : "gregorian"
}

class RangeDatePicker extends React.Component{
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.validateDateValue = this.validateDateValue.bind(this);
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validateDateValue);
        }
    }

    validateDateValue (dateValue, formValidation) {
        let validateResult = {isValid: true};
        if (formValidation) {
            validateResult = validate(dateValue, formValidation, 'startDate');
            if (validateResult.isValid && validateResult.isValid == true) {
                validateResult = validate(dateValue, formValidation, 'endDate');
            }
        }

        return validateResult;
    }

    handleChange (_date, dateStr) {
        const {calendar, onChange} = this.props;
        if (onChange) {
            let startDate = convertNumbers2English(dateStr[0].replace(/-/g, '/'));
            let endDate = convertNumbers2English(dateStr[1].replace(/-/g, '/'));
            if (calendar == calendars.GREGORIAN) { // to store date in Jalaali mode
                startDate = gregorianToJalaaliDate(startDate);
                endDate = gregorianToJalaaliDate(endDate);
            }
            onChange({
                startDate: startDate,
                endDate: endDate,
            });
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.value) != JSON.stringify(prevProps.value)) {
            if (this.props.value) {
                this.setState( {
                    value:{
                        startDate: this.props.value.startDate ? this.props.value.startDate : '',
                        endDate: this.props.value.endDate ? this.props.value.endDate : ''
                    }
                });
            }else {
                this.setState( {
                    value:{
                        startDate:  '',
                        endDate: ''
                    }
                });
            }
        }
    }

    render () {
        const {value,disabled,calendar,errorText,showTime} = this.props;
        let date=[];
        if( value && isObject(value)){// TODO
            let startDate=value.startDate,endDate=value.endDate;
            if(calendar == calendars.GREGORIAN) {
                startDate = jalaaliToGregorian(startDate);
                endDate = jalaaliToGregorian(endDate);
            }
            date = [stringToMoment(startDate, calendar), stringToMoment(endDate, calendar)];
        }

        return (
            <BasicRangeDatePicker label={this.props.label}
                              mandatoryPresentational={this.props.mandatoryPresentational}
                              id={this.props.id}
                              value={date}
                              disabled={disabled}
                                  disabledDate={this.props.disabledDate}
                              onChange={this.handleChange}
                              errorText={errorText}
                              showTime={showTime}
            />
        );
    }
}


export default RangeDatePicker;
