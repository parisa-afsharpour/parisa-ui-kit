import * as React from 'react';
import TextField from '../textField/TextField';
import Row from '../grid/Row';
import Col from '../grid/Col';
import {Input} from 'antd'
import {validate, messages} from '../form/FormValidation'
import FormHelperText from "../formHelperText/FormHelperText";
import FormControlLabel from "../formControlLabel/FormControlLabel";

const businessMessage = {
    errorText: {
        id: 'errorText',
        defaultMessage: 'مقدار این فیلد به درستی وارد نشده است.',
    },
};

class CardNumber extends React.Component {
    passwordInput = null;

    constructor(props) {
        super(props);
        this.textInput1 = React.createRef();
        this.textInput2 = React.createRef();
        this.textInput3 = React.createRef();
        this.textInput4 = React.createRef();

        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
        const value = this.props.value;
        this.state = {
            value: {
                part1: this.props.value.part1 ? this.props.value.part1 : value.substring(0, 4),
                part2: this.props.value.part2 ? this.props.value.part2 : value.substring(4, 8),
                part3: this.props.value.part3 ? this.props.value.part3 : value.substring(8, 12),
                part4: this.props.value.part4 ? this.props.value.part4 : value.substring(12, 16),
            }
        };
    }


    validation(value, formValidation) {
        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory) {
                    if (typeof value === 'undefined' || !value || Object.keys(value).length == 0 ){
                    validateResult = {
                        isValid: false,
                        errorText: messages.mandatory.defaultMessage
                    }
                }
                else if (typeof  value === 'string'){
                    if (value.length < 16) {
                        validateResult = {
                            isValid: false,
                            errorText: businessMessage.errorText.defaultMessage
                        }
                    }
                }

                else if (value.part1.length < 4 || value.part2.length < 4 || value.part3.length < 4 || value.part4.length < 4) {
                    validateResult = {
                        isValid: false,
                        errorText: businessMessage.errorText.defaultMessage
                    }
                }
            } else {
                if (typeof value === 'undefined' || !value || Object.keys(value).length == 0 ){
                    return ;
                }
                let acc = `${value.part1}${value.part2}${value.part3}${value.part4}`
                if (acc && acc.length != 16) {
                    validateResult = {
                        isValid: false,
                        errorText: businessMessage.errorText.defaultMessage
                    }
                }
            }
        }

        return validateResult;

    }

    onChange(type, e, value) {
        const value2 = value.replace(/[^\d\.]/g, '')
        let data = {
            part1: this.state.value.part1 ? this.state.value.part1 : '',
            part2: this.state.value.part2 ? this.state.value.part2 : '',
            part3: this.state.value.part3 ? this.state.value.part3 : '',
            part4: this.state.value.part4 ? this.state.value.part4 : '',
        };
        switch (type) {
            case 'part4':
                data.part4 = value2.substring(0, 4);
                break;

            case 'part3':
                if (value2.length == 4) {
                    this.textInput4.focus()
                }
                data.part3 = value2.substring(0, 4);
                break;

            case 'part2':
                if (value2.length == 4) {
                    this.textInput3.focus()

                }
                data.part2 = value2.substring(0, 4);
                break;

            case 'part1':
                if (value2.length == 4) {
                    this.textInput2.focus()

                }
                data.part1 = value2.substring(0, 4);
                break;

            default:
                break;
        }

        this.setState({
            value: data
        });

        if (this.props.onChange) {
            this.props.onChange(data);
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {value} = this.props;
        let data;
        if (JSON.stringify(value) != JSON.stringify(prevProps.value)) {
            if (typeof value == 'string') {
                if (value.length === 16) {
                    data = {
                        part1: value.substring(0,4),
                        part2: value.substring(4, 8),
                        part3: value.substring(8, 12),
                        part4: value.substring(12 ,16),
                    };

                } else {

                    console.error('plz send object data or string with length 13');
                    data = {
                        part1: '',
                        part2: '',
                        part3: '',
                        part4: '',
                    };
                }
            } else {
                data = {
                    part1: this.props.value.part1 ? this.props.value.part1 : '',
                    part2: this.props.value.part2 ? this.props.value.part2 : '',
                    part3: this.props.value.part3 ? this.props.value.part3 : '',
                    part4: this.props.value.part4 ? this.props.value.part4 : '',
                };
            }

            this.setState({
                value: data
            });
        }
    }

    render() {
        const {label, mandatoryPresentational, disabled, errorText} = this.props;
        return (
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational}/>
                <Row gutter={2}>
                    <Col sm={6}>
                        <TextField id={'cardNumber'}
                                   dir={'ltr'}
                                   onChange={this.onChange.bind(this, 'part4')}
                                   value={this.state.value.part4}
                                   getRef={input => {
                                       this.textInput4 = input;
                                   }}
                                   disabled={disabled}
                                   noError={true}
                        />
                    </Col>
                    <Col sm={6}>
                        <TextField id={'cardNumber'}
                                   dir={'ltr'}
                                   onChange={this.onChange.bind(this, 'part3')}
                                   value={this.state.value.part3}
                                   getRef={input => {
                                       this.textInput3 = input;
                                   }}
                                   disabled={disabled}
                                   noError={true}
                        />
                    </Col>
                    <Col sm={6}>
                        <TextField id={'cardNumber'}
                                   dir={'ltr'}
                                   onChange={this.onChange.bind(this, 'part2')}
                                   value={this.state.value.part2}
                                   getRef={input => {
                                       this.textInput2 = input;
                                   }}
                                   disabled={disabled}
                                   noError={true}
                        />
                    </Col>
                    <Col sm={6}>
                        <TextField id={'cardNumber'}
                                   dir={'ltr'}
                                   onChange={this.onChange.bind(this, 'part1')}
                                   value={this.state.value.part1}
                                   getRef={input => {
                                       this.textInput1 = input;
                                   }}
                                   disabled={disabled}
                                   noError={true}
                        />
                    </Col>
                </Row>
                <FormHelperText text={errorText} type={'error'}/>

            </React.Fragment>
        )
    }

}

export default CardNumber;