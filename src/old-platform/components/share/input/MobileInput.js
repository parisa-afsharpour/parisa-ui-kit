import React from "react";
import TextField from '../textField/TextField';
import FormControlLabel from "../formControlLabel/FormControlLabel";
import FormHelperText from "../formHelperText/FormHelperText";
import {messages} from "../form/FormValidation";


class MobileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.value
        };
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }


    validation (value, formValidation){

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null ||
                value ===undefined ||
                value ===''

            )){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }else if (value){
                const data=value.match(
                    /^((|09)[0-9]{9}|(|098|0098)[0-9]{10})|((|98)[0-9]{11})$/
                );
                if(!data){
                    validateResult={
                        isValid:false,
                        errorText:messages.mobileFormat.defaultMessage
                    }
                }
            }
        }
        return validateResult;
    }

    handleOnChange=(e,value)=>{
        const {onChange} = this.props;
        this.setState({value:this.state.value})

        if (onChange && typeof onChange === 'function') {
            this.props.onChange(value)
        }
    };


    render(){
        const {label,id,value,errorText,mandatoryPresentational,hintText,disabled}=this.props;

        return(
            <React.Fragment>
                {label && <FormControlLabel label={label} isMandatory={mandatoryPresentational} />}
                <TextField id={id}
                           onChange={this.handleOnChange}
                           value={this.props.value}
                           noError={true}
                           disabled={disabled}
                           hintText={hintText}
                />
                <FormHelperText text={errorText} type={'error'} />
            </React.Fragment>
        )
    }




}
export default MobileInput;
