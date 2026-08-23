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
        defaultMessage: 'محدوده شماره به درستی وارد نشده است',
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
            value:{
                from: this.props.value.from ? this.props.value.from : '',
                to: this.props.value.to ? this.props.value.to : ''
            }
        };
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.value) != JSON.stringify(prevProps.value)) {
            if (this.props.value) {
                this.setState( {
                    value:{
                        from: this.props.value.from ? this.props.value.from : '',
                        to: this.props.value.to ? this.props.value.to : ''
                    }
                });
            }
        }
    }

    validation (value, formValidation){

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null ||
                value ===undefined ||
                value ==='' ||
                value.from ===undefined ||
                value.to ===undefined ||
                value.from ==='' ||
                value.to ==='' //TODO OBJECT.KEYS.LEMGTH == 0
            )){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }else if (value && value.from && value.to ){
                const fromAmount=value.from;
                const toAmount=value.to;
                if (fromAmount > toAmount ){
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
        let data ={
            from:this.state.value.from,
            to:this.state.value.to,
        };

        switch (type) {
            case 'from':
                data.from = e.target.value;
                break;
            case 'to':
                data.to = e.target.value;
                break
        }
        this.setState({
            value:data
        });


        if (onChange && typeof onChange === 'function') {
            this.props.onChange(data)
        }
    };



    render() {
        const {label,mandatoryPresentational,errorText,value,disabled}=this.props;
        return(
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <Row gutter={5}>
                    <Col sm={12}>

                        <TextField
                                   onChange={this.handleOnChange.bind(this,'from')}
                                   value={this.state.value.from}
                                   noError={true}
                                   disabled={disabled}
                                   hintText={businessMessage.fromAmount.defaultMessage}
                        />
                    </Col>
                    <Col sm={12}>
                        <TextField
                                   onChange={this.handleOnChange.bind(this,'to')}
                                   value={this.state.value.to}
                                   noError={true}
                                   disabled={disabled}
                                   hintText={businessMessage.fromAmount.defaultMessage}
                        />
                    </Col>
                </Row>
                <FormHelperText text={errorText} type={'error'} />
            </React.Fragment>
        )
    }

}

export default RangeChequeNumber;