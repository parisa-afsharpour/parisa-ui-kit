import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd';
import FormHelperText from '../formHelperText/FormHelperText';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import {uniqueId} from "../utils/utils";
import moment from 'moment';

class DatePicker extends React.Component{

    static propTypes = {
        disabled: PropTypes.bool,
        errorText: PropTypes.string,
        label: PropTypes.string,
        mandatoryPresentational: PropTypes.bool,
        onChange: PropTypes.func,
        showTime: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.object,
        id:PropTypes.string,
    };

    static defaultProps = {
        disabled: false,
        mandatoryPresentational: false,
        showTime: false
    };

    constructor(props){
        super(props);
        this.ELEMENT_ID =`${uniqueId()}-${props.id}`;
    }

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
            style,
            mandatoryPresentational,
            showTime,
            format,
            id,
            disabledDate,
            placeholder,
            mode
        } = this.props;
        return (
            <div id={this.ELEMENT_ID} className={'datePickerParent'} style={{display:`${this.props.displayInlineBlock ?'inline-block' :'block'}`}}>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <AntDatePicker
                    mode={mode}
                    allowClear
                    showTime={showTime}
                    disabledDate={disabledDate?this.disabledDate:false}
                    format={format}
                    disabled={disabled}
                    onChange={onChange}
                    onPanelChange={
                        onChange
                    /*(date) => {
                        console.log('year parisa ----->',date);
                        console.log('year parisa 222----->',date.format('YYYY'));
                        // ⬇️ این خط انتخاب واقعی را انجام می‌دهد
                        /!*this.handleChange(date, date.format('YYYY'));*!/
                    }*/
                }
                    value={value}
                    id={id}
                    style={style}
                    getCalendarContainer={()=> document.getElementById(this.ELEMENT_ID)}
                    placeholder={placeholder}
                />
                {label && <FormHelperText text={errorText} type={'error'} />}
            </div>
        );
    }
}

export default DatePicker;
