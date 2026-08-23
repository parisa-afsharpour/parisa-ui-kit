import React from 'react';
import { Select as AntSelect } from 'antd';
import PropTypes from 'prop-types';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import FormHelperText from '../formHelperText/FormHelperText';
import { getCustomContainer, handleVisibleChange } from '../utils/popupContainer';
import { exist } from '../utils/utils';

class Select extends React.Component{
    constructor(props) {
        super(props);
    }

    handleFilter = (input, option) => {
        const itemText = option.props.children;
        if(exist(itemText)){
            return itemText.toLowerCase().includes(input.toLowerCase());
        }
        return false;
    };

    handleChange = (value, option)=>{
        if (this.props.onChange) {
            this.props.onChange(value, option);
        }
    };
    static Option = AntSelect.Option;
    render() {
        const {
            className,
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

        return(
            <div style={style}>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational}/>
                <AntSelect
                    className= {className}
                    mode={multiple ? 'multiple': null}
                    showSearch
                    placeholder={hintText}
                    optionFilterProp={'children'}
                    filterOption={this.handleFilter}
                    value={value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    id={id}
                    onBlur={onBlur}
                    onDropdownVisibleChange={handleVisibleChange}
                    getPopupContainer={getCustomContainer}
                    autoFocus={autoFocus}
                >
                    {children}
                </AntSelect>
                <FormHelperText type={'error'} text={errorText}/>
            </div>
        )
    }

}

export default Select;