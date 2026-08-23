import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd';
import FormHelperText from '../formHelperText/FormHelperText';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import moment from "moment";

const {RangePicker} = AntDatePicker;

class BasicRangeDatePicker extends React.Component {

    static propTypes = {
        disabled: PropTypes.bool,
        errorText: PropTypes.string,
        id:PropTypes.string,
        label: PropTypes.string,
        mandatoryPresentational: PropTypes.bool,
        onChange: PropTypes.func,
        showTime: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.arrayOf(PropTypes.object),
    };

    static defaultProps = {
        disabled: false,
        mandatoryPresentational: false,
        showTime: false
    };

    changeValue(value) {
        if(this.props.changeValue){
            this.props.changeValue(value)
        }
    }

    onChange(date, dateStr) {
        if(this.props.onChange)
            this.props.onChange(date, dateStr)
    }

     disabledDate(current) {
         return current && current >= moment().startOf('day');
    }

    render() {
        const {
            disabled,
            label,
            onChange,
            errorText,
            value,
            id,
            style,
            showTime,
            mandatoryPresentational,
            disabledDate
        } = this.props;

        return (
            <div>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <RangePicker onChange={onChange}
                             id={id}
                             style={style}
                             disabled={disabled}
                             disabledDate={disabledDate?this.disabledDate:false}
                             value={value}
                             showTime={showTime}
                             format={'YYYY/MM/DD'}
                />
                {label && <FormHelperText text={errorText} type={'error'} />}
            </div>
        );
    }
}

export default BasicRangeDatePicker;