import * as React from 'react';
import Col from '../grid/Col';
import Row from '../grid/Row';
import DatePicker from './DatePicker'
import Checkbox from '../checkbox/Checkbox'
import FormControlLabel from "../formControlLabel/FormControlLabel";
import FormHelperText from "../formHelperText/FormHelperText";
import {messages} from "../form/FormValidation";

class DatePackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                today:this.props.value && this.props.value.today ? this.props.value.today : true,
                date:this.props.value && this.props.value.date ? this.props.value.date : ''
            }
        };
        if (this.props.onChange){
            this.props.onChange(this.state.data)
        }

        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
    }

    validation (value, formValidation){

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null || value === undefined || value.today ==='')){
                validateResult={
                    isValid:false,
                    errorText:messages.mandatory.defaultMessage
                }
            }
        }
        return validateResult;

    }

    handleOnChange=(value)=>{
        let data={
            today:false,
            date:value
        };
        this.setState(prevState =>({
            ...prevState,
            date:data
        }));
        if (this.props.onChange){
            this.props.onChange(data)
        }
    };

    handleCheck = (event) => {
        const {checked} = event.target;
        let data={
            today:checked,
            date:checked ? '' : this.props.value.date
        };
        this.setState(prevState =>({
            ...prevState,
            date:data
        }));
        if (this.props.onChange){
            this.props.onChange(data)
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value =='' && prevProps.value != this.props.value ){
            this.setState({
                data:{
                    today: true,
                    date: ''
                }
            });

            if (this.props.onChange){
                this.props.onChange(this.state.data)
            }
        }
    }

    render() {
        const {label,mandatoryPresentational,errorText}=this.props;
        return(
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <Row gutter={1} align={'middle'}>
                    <Col  lg={6} md={8} sm={12}>
                        <Checkbox label={'امروز'}
                                  withOutHeight={true}
                                  disabled={this.props.disabled}
                                  onCheck={this.handleCheck}
                                  checked={this.props.value && this.props.value.today}
                        />
                    </Col>
                    <Col  lg={18} md={16} sm={12}>
                        <DatePicker onChange={this.handleOnChange}
                                    value={this.props.value && this.props.value.date}
                                    disabled={(this.props.value && this.props.value.today)||this.props.disabled}
                        />
                    </Col>
                </Row>
                <FormHelperText text={errorText} type={'error'} />
            </React.Fragment>
        )
    }

}

export default DatePackage;