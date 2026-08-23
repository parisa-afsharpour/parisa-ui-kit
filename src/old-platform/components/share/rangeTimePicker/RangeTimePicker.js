import * as React from 'react';
import TimePicker from '../timePicker/TimePicker';
import Col from "../grid/Col";
import Row from "../grid/Row";
import FormControlLabel from "../formControlLabel/FormControlLabel";
import FormHelperText from "../formHelperText/FormHelperText";
import {messages} from '../form/FormValidation';

const businessMessage={
    errorText: {
        id: 'errorText',
        defaultMessage: 'محدوده زمان به درستی وارد نشده است',
    },
    startTime: {
        id: 'startTime',
        defaultMessage: 'زمان شروع',
    },
    endTime: {
        id: 'endTime',
        defaultMessage: 'زمان پایان',
    },
};



class RangeTimePicker extends React.Component{
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
            }else {
                this.setState( {
                    value:{
                        from:  '',
                        to: ''
                    }
                });
            }
        }
    }


    validation (value, formValidation){

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null || value ===undefined || value.from ==='' || value.to ==='' || value ==='')){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }else if (value && value.from && value.to ){
                const fromTime=value.from.split(":").join('');
                const toTime=value.to.split(":").join('');
                if (Number(fromTime) > Number(toTime)){
                    validateResult={
                        isValid:false,
                        errorText:businessMessage.errorText.defaultMessage
                    }

                }
            }
        }

        return validateResult;

    }

    onChange(type,time){
        let data ={
            from:this.state.value.from,
            to:this.state.value.to,
        };

        switch (type) {
            case 'from':
                data.from = time;
                break;
            case 'to':
                data.to = time;
                break
        }

        this.setState({
            value:data
        });

        if (this.props.onChange) {
            this.props.onChange(data);
        }
    }



    render(){
        const {id,label,mandatoryPresentational,errorText,disabled,showSecond}=this.props;
        return(
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <Row gutter={5}>
                    <Col sm={12}>
                        <TimePicker id={ 'from'+ id}
                                    value={this.state.value.from}
                                    disabled={disabled}
                                    showSecond={showSecond}
                                    placeholder={businessMessage.startTime.defaultMessage}
                                    onChange={this.onChange.bind(this,'from')}
                        />
                    </Col>
                    <Col sm={12}>
                        <TimePicker id={ 'to'+ id}
                                    value={this.state.value.to}
                                    disabled={disabled}
                                    showSecond={showSecond}
                                    placeholder={businessMessage.endTime.defaultMessage}
                                    onChange={this.onChange.bind(this,'to')}
                        />
                    </Col>

                </Row>
                <FormHelperText text={errorText} type={'error'} />
            </React.Fragment>
        )
    }

}

export default RangeTimePicker;
