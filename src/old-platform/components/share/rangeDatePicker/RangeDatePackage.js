import React from "react";
import RangeDatePicker from "./RangeDatePicker";
import Col from '../grid/Col';
import Row from '../grid/Row';
import FormControlLabel from "../formControlLabel/FormControlLabel";
import Checkbox from '../checkbox/Checkbox'
import {messages} from "../form/FormValidation";
import FormHelperText from "../formHelperText/FormHelperText";



class RangeDatePackage extends React.Component{
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

    validation(value, formValidation) {

        let validateResult = {isValid: true};
        if (formValidation) {
            if (formValidation.mandatory && (value === null || value === undefined || (value.date === '' && value.today === false))
                || formValidation.mandatory && value.today === false && value.date.endDate === "") {
                validateResult = {
                    isValid: false,
                    errorText: messages.mandatory.defaultMessage
                }
            }
        }
        return validateResult;

    }


    handleOnChange=(value)=>{
        let data={
            today:this.props.value.today,
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
        let data = {
            today: checked,
            date:    checked
                ? ''
                :(!checked && (this.props.value.date.startDate==undefined || this.props.value.date.endDate==undefined))
                    ? {endDate:'',startDate:''}
                    :this.props.value.date
        };
        this.setState(prevState => ({
            ...prevState,
            date: data
        }));
        if (this.props.onChange) {
            this.props.onChange(data)
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value =='' && prevProps.value != this.props.value ){
            this.setState({
                data:{
                    today:this.props.value && this.props.value.today ? this.props.value.today : true,
                    date:this.props.value && this.props.value.date ? this.props.value.date : ''
                }
            });

            if (this.props.onChange){
                this.props.onChange({
                    today:this.props.value && this.props.value.today ? this.props.value.today : true,
                    date:this.props.value && this.props.value.date ? this.props.value.date : ''
                })
            }
        }
    }

    render(){
        const {mandatoryPresentational,label,errorText}=this.props;
        return(
            <React.Fragment>
                <FormControlLabel label={label} isMandatory={mandatoryPresentational} />
                <Row gutter={1} align={'middle'}>
                    <Col  lg={6} md={8} sm={8}>
                        <Checkbox label={'امروز'}
                                  withOutHeight={true}
                                  onCheck={this.handleCheck}
                                  disabled={this.props.disabled}
                                  checked={this.props.value && this.props.value.today}
                        />
                    </Col>
                    <Col  lg={18} md={16} sm={16}>
                        <RangeDatePicker onChange={this.handleOnChange}
                                         disabledDate={this.props.disabledDate}
                                    value={this.props.value && this.props.value.date}
                                    disabled={(this.props.value && this.props.value.today) || this.props.disabled}
                        />
                    </Col>
                </Row>
                <FormHelperText text={errorText} type={'error'} />


            </React.Fragment>
        );
    }

}
export default RangeDatePackage;