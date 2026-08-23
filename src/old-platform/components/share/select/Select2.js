import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect } from 'antd';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import FormHelperText from '../formHelperText/FormHelperText';
import { exist } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


class Select extends React.Component {

    static propTypes = {
        autoFocus: PropTypes.bool,
        /**
         * If true, the select field will be disabled.
         */
        disabled: PropTypes.bool,
        errorText: PropTypes.node,
        /**
         * The hint content to display.
         */
        hintText: PropTypes.string,
        /**
         * The id prop for the text field.
         */
        id: PropTypes.string,
        /**
         * property type
         * The value of label
         * The content of the floating label(material-ui floatingLabelText).
         */
        label: PropTypes.string,
        mandatoryPresentational:PropTypes.bool,
        multiple: PropTypes.bool,
        /**
         * Callback function fired when a menu item is selected.
         */
        onChange: PropTypes.func,
        /**
         * The value that is currently selected.
         */
        onBlur:PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    };

    static defaultProps = {
        disabled: false,
    };

    handleChange = (value, option)=>{
        if (this.props.onChange) {
            this.props.onChange(value, option);
        }
    };

    handleFilter = (input, option) => {
        const itemText = option.props.children;
        if(exist(itemText)){
            return itemText.toLowerCase().includes(input.toLowerCase());
        }
        return false;
    };

    static Option = AntSelect.Option;
    render() {
        const {
            value,
            label,
            disabled,
            hintText,
            id,
            children,
            onBlur,
            errorText,
            mandatoryPresentational,
            style,
            multiple,
            autoFocus,
        } = this.props;
        return (
            <div  style={style}>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational}/>
                <AntSelect
                    mode={multiple ? 'multiple': null}
                    showSearch
                    placeholder={multiple ?"انتخاب چند گانه":hintText}
                    showArrow={true}
                    optionFilterProp={'children'}
                    filterOption={this.handleFilter}
                    value={value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    id={id}
                    onBlur={onBlur}
                    autoFocus={autoFocus}


                >
                    {children}
                </AntSelect>
                <FormHelperText type={'error'} text={errorText}/>
            </div>
        );
    }
}

export default Select;