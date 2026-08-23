import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import FormHelperText from '../formHelperText/FormHelperText';
const { TextArea } = Input;

class TextField extends React.Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        defaultValue: PropTypes.any,
        disabled: PropTypes.bool,
        errorText: PropTypes.node,
        hintText: PropTypes.node,
        id: PropTypes.string,
        inputStyle: PropTypes.object,
        onChange: PropTypes.func,
        value: PropTypes.any,
        onEnter: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyDown: PropTypes.func,
        type: PropTypes.string,
        style: PropTypes.object,
        mandatoryPresentational:PropTypes.bool,
        fullWidth: PropTypes.bool,
        autoFocus: PropTypes.bool,
    };

    static defaultProps = {
        mandatoryPresentational: false,
        fullWidth: false
    };

    handleChange =(type,e)=> {
        const {length,onChange}=this.props;
        const { value } = e.target;
        let allowedValue='';
        let reg;
        if (type ==='number'){
            allowedValue=value.replace(/,/g, '').replace(/[^\d]/,'')
        }else if(type==="password"){
            allowedValue= value
        }else{
            reg = /[~`!\^&()+=\[\]\\';/{}|\\"<>\?]/g;
             allowedValue=value.replace(reg, '')
        }
        if (length && typeof(length) =='number') {
            allowedValue=allowedValue.substring(0, length);
        }
        if (onChange && typeof (onChange) == 'function'){
            this.props.onChange(e, allowedValue);
        }
    };

    handleKeyPress (e) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(e);
        }
    }

    handleFocus = (e)=>{
        this.props.onFocus && this.props.onFocus(e);
    };

    handleBlur= (e)=>{
        this.props.onBlur && this.props.onBlur(e);
    };

    handleOnEnter= (e)=>{
        this.props.onEnter && this.props.onEnter(e);
    };

    render() {
        const {
            label,
            defaultValue,
            disabled,
            errorText,
            hintText,
            id,
            inputStyle,
            value,
            type,
            mandatoryPresentational,
            style,
            autoFocus,
            className,
            dir,
            getRef,
            allowClear,
            noError,
            length,
            rows
        } = this.props;

        return (
            <div style={style} className={'input'}>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                {type==="password" &&
                <Input.Password  dir={dir}
                   className={className}
                   defaultValue={defaultValue}
                   disabled={disabled}
                   id={id}
                   onChange={this.handleChange.bind(this,'password')}
                   placeholder={hintText}
                   value={value}
                   onBlur={this.handleBlur}
                   onFocus={this.handleFocus}
                   onPressEnter={this.handleOnEnter}
                   type={type}
                   autoFocus={autoFocus}
                   autoComplete='new-password'
                   style={inputStyle}
                   ref={input => {
                            if (getRef){
                                getRef (input );
                            }
                        }}/>}

                {type==="number" &&
                <Input
                    dir={dir}
                    className={className}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={id}
                    onChange={this.handleChange.bind(this,'number')}
                    placeholder={hintText}
                    value={value}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onPressEnter={this.handleOnEnter}
                    //type={type}
                    autoFocus={autoFocus}
                    style={inputStyle}
                    ref={input => {
                        if (getRef){
                            getRef (input );
                        }
                    }}
                />
                }
            {type==="textarea" &&
                <TextArea
                   dir={dir}
                   className={className}
                   defaultValue={defaultValue}
                   disabled={disabled}
                   id={id}
                   rows={rows}
                   onChange={this.handleChange.bind(this,'textarea')}
                   onKeyPress={this.handleKeyPress.bind(this)}
                   placeholder={hintText}
                   value={value}
                   onBlur={this.handleBlur}
                   onFocus={this.handleFocus}
                   onPressEnter={this.handleOnEnter}
                   autoFocus={autoFocus}
                   style={inputStyle}
                   ref={input => {
                            if (getRef){
                                getRef (input );
                            }
                        }}/>}
            {type!=="password" &&   type!=="textarea"  && type!=="number" &&
                <Input
                    dir={dir}
                    className={className}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={id}
                    onChange={this.handleChange.bind(this,'simple')}
                    placeholder={hintText}
                    value={value}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    allowClear={allowClear?allowClear:false}
                    onPressEnter={this.handleOnEnter}
                    type={type}
                    autoFocus={autoFocus}
                    style={inputStyle}
                     ref={input => {
                         if (getRef){
                             getRef (input );
                         }
                     }}
                />}
                {!noError && <FormHelperText text={errorText} type={'error'} />}
            </div>
        );
    }
}

export default TextField;
