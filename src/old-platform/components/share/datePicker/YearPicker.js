import * as React from 'react';
import { connect } from 'react-redux';
import DatePickerW from './BasicDatePicker';
import { convertNumbers2English, stringToMoment, jalaaliToGregorian, gregorianToJalaaliDate } from '../utils/datetime';
import { validate } from '../form/FormValidation';

export const calendars ={
    JALAALI : "jalaali",
    GREGORIAN : "gregorian"
};
export const localesKey= {
    Persian : "fa-IR",
    English : "en-US"
};

export const locales = [
    {
        key: localesKey.English,
        localName: "English (US)",
        englishName: "English (US)",
        firstDayOfWeek: 1,
        calendar: calendars.GREGORIAN
    },
    {
        key: localesKey.Persian,
        localName: "فارسی",
        englishName: "Persian",
        firstDayOfWeek: 6,
        calendar: calendars.JALAALI
    }
];

class YearPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.validateDateValue = this.validateDateValue.bind(this);
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validateDateValue);
        }
    }

    validateDateValue(dateValue, formValidation) {
        let validateResult = { isValid: true };
        if (formValidation) {
            validateResult = validate(dateValue, formValidation);
        }
        return validateResult;
    }

    handleChange(_date, dateStr) {
        const { calendar, onChange } = this.props;
        console.log('onChange year picker ------>',dateStr);
        if (onChange) {
            let stringDate = convertNumbers2English(dateStr.replace(/-/g, '/'));
            if (calendar == calendars.GREGORIAN) {
                // to store date in Jalaali mode
                stringDate = gregorianToJalaaliDate(stringDate);
            }
            onChange(stringDate);
        }
    }

    render() {
        const { value = '', calendar, placeholder } = this.props;
        let dateValue = value;

        if (calendar == calendars.GREGORIAN) {
            dateValue = jalaaliToGregorian(dateValue);
        }

        return (
            <DatePickerW
                label={this.props.label}
                mandatoryPresentational={this.props.mandatoryPresentational}
                id={this.props.id}
                value={stringToMoment(dateValue, calendar)}
                disabled={this.props.disabled}
                errorText={this.props.errorText}
                placeholder={placeholder}
                disabledDate={this.props.disabledDate}
                displayInlineBlock={this.props.displayInlineBlock}

                /* ✅ فقط این ۳ خط مهم است */
                format="YYYY"
                mode="year"
                onChange={(date) => this.handleChange(date, date.format('YYYY'))}
             /*   onChange={this.props.onChange}*/
            />
        );
    }
}

const mapStateToProps = (state, ownProps)  => ({
    ...ownProps,
    calendar: state.locale.locale.calendar,
});

export default YearPicker;
