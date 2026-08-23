import React from "react";
import Amount from "./Amount";
import Col from '../grid/Col'
import Row from '../grid/Row'
import FormControlLabel from "../formControlLabel/FormControlLabel";
import FormHelperText from "../formHelperText/FormHelperText";
import TextField from "../textField/TextField";
import {messages} from "../form/FormValidation";

const businessMessage= {
    errorText: {
        id: 'errorText',
        defaultMessage: 'کد ملی وارد شده معتبر نمیباشد',
    },
    fromAmount:{
        id: 'fromAmount',
        defaultMessage: 'شماره از',
    },
    toAmount:{
        id: 'toAmount',
        defaultMessage: 'شماره تا',
    }
}

class RangeChequeNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.value}
        ;
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.value) != JSON.stringify(prevProps.value)) {
                this.setState( {
                    value:
                        this.props.value

                });
        }
    }

    validation (value, formValidation){
        let sRegExp = new RegExp('^[0-9]+$');
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
            }else if (value  ){

                if (!sRegExp.test(value)){
                    validateResult={
                        isValid:false,
                        errorText:businessMessage.errorText.defaultMessage
                    }

                }
            }
        }
        return validateResult;
    }

    handleOnChange=(type,e)=> {
        const {onChange} = this.props;


        this.setState({
            value:e.target.value.replace(/,/g, '').replace(/[^\d]/,'').substring(0, 10)
        });


        if (onChange && typeof onChange === 'function') {
            if (!e.target.value){
                this.props.onChange('');
            }else
            this.props.onChange(e.target.value.replace(/,/g, '').replace(/[^\d]/,'').substring(0, 10))
        }
    };



    render() {
        const {label,mandatoryPresentational,errorText,value,disabled}=this.props;
        return(
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <Row gutter={5}>
                    <Col sm={24}>

                        <TextField
                            onChange={this.handleOnChange.bind(this,'from')}
                            value={this.state.value}
                            noError={true}
                            disabled={disabled}
                        />
                    </Col>

                </Row>
                <FormHelperText text={errorText} type={'error'} />
            </React.Fragment>
        )
    }

}

export default RangeChequeNumber;