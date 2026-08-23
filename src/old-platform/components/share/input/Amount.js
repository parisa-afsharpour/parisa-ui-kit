import React from "react";
import TextField from '../textField/TextField';
import FormControlLabel from "../formControlLabel/FormControlLabel";
import FormHelperText from "../formHelperText/FormHelperText";
import {messages} from "../form/FormValidation";


class Amount extends React.Component {
    constructor(props) {
        super(props);
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }

    validation (value, formValidation){
        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value == null || value ==undefined || value ==='')){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }
        }

        return validateResult;

    }

    render(){
        const {label,id,value,errorText,mandatoryPresentational,hintText,disabled}=this.props;
        const customValue = this.getCustomValue(value, true);
        return(
            <React.Fragment>
                {label && <FormControlLabel label={label} isMandatory={mandatoryPresentational} />}
                <TextField id={id}
                           onChange={this.handleOnChange}
                           value={customValue}
                           noError={true}
                           disabled={disabled}
                           hintText={hintText}
                           dir={'ltr'}
                />
                {errorText && <FormHelperText text={errorText} type={'error'} />}
            </React.Fragment>
    )
    }

    handleOnChange=(e,value)=>{
        const { onChange,isNegative } = this.props;
        if (onChange && typeof onChange === 'function') {
            if(isNegative){
                this.props.onChange(value.replace(/,/g, '').replace(/[^-?\d+$]/,'').substring(0, 15))
            }else{
                this.props.onChange(value.replace(/,/g, '').replace(/[^\d]/,'').substring(0, 15))
            }

        }
    };

    getCustomValue = (value, hasCommas)=> {
        if (hasCommas) {
            const valueWithCommas = addCommaToAmount(value, 3);
            return valueWithCommas;
        }
        return value;
    };

}
export default Amount;

function replaceAll(str, from, to) {
    let idx = str.indexOf(from);
    while (idx > -1) {
        str = str.replace(from, to);
        idx = str.indexOf(from);
    }
    return str;
}

function splitNumber(n, m) {
    n = replaceAll(n, ",", "");
    let s = n + "";
    let res = new Array();
    while (s != "") {
        res.push(s.substring(s.length - m, s.length));
        s = s.substring(0, s.length - m);
    }

    return res;
}

export function addCommaToAmount(amount, num) {
    amount += "";
    if (num == undefined) {
        num = 3;
    }
    let newAmount;
        let neg = false;
        amount = replaceAll(amount, ",", "");
        if (parseInt(amount, 10) < 0) {
            amount = -parseInt(amount, 10) + "";
            neg = true;
        }
        let result = splitNumber(amount, num);
        if (result.length == 0)
            return "";
        newAmount = result[0];
        for (let i = 1; i < result.length; i++) {
            newAmount = result[i] + "," + newAmount;
        }
        if (neg) {
            newAmount = "-" + newAmount;
        }

    return newAmount;
}