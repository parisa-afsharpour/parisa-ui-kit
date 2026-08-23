import * as React from 'react';
import TextField from '../textField/TextField';
import FlatButton from '../flatButton/FlatButton';
import { openModal } from '../utils/common';
import FormControlLabel from '../formControlLabel/FormControlLabel';
import GridTile from '../grid/Col';
import GridList from '../grid/Row';
import AccountSearchByCustomerNumber from "../../account-Search/AccountSearchByCustomerNumber";
const businessMessage = {
    errorText: {
        id: 'errorText',
        defaultMessage: 'مقدار این فیلد به درستی وارد نشده است.',
    },
};
class AccountNumberSearch extends React.Component {
    constructor(props){
        super(props);
        
        if (props.validatorRegistrar) {
            props.validatorRegistrar(this.validation.bind(this));
        }
        this.state={
            accountNumber: props.value ?  props.value : null
        }
    }
showModal=()=>{
    let component;
    let title='جستجو شماره حساب با استفاده از شماره مشتری';
    component=<AccountSearchByCustomerNumber  sendData = {this.sendData} title={'شماره حساب'}/>;
    if( component !== undefined){
        openModal(title,component);
    }
}
componentDidUpdate(prevProps, prevState, snapshot) {
    const {value} = this.props;
    if (JSON.stringify(value) != JSON.stringify(prevProps.value)) {
        this.setState({
            accountNumber:value
        });
    }
}
removeDash(value){
    return value && typeof value ==="string" ? value.replaceAll("-", "") : value && value.accountNumber ? value.accountNumber.replaceAll("-", "") : value;
}

addDashToInput(a){
    const len = a && typeof a ==="string" ? a.replaceAll("-", "").length : a&& a.accountNumber ? a.accountNumber.replaceAll("-", "").length :0 ;
    if(len <= 2){
        return a;
    }
    if(len>2 && len <= 10 ){
        a = this.removeDash(a);
        return a.slice(0, 2)+'-'+a.slice(2, 10);
    }
    else if(len>10 && len<=12 ){
        a = this.removeDash(a);
        return a.slice(0, 2)+'-'+a.slice(2, 10)+'-'+ a.slice(10, 12);
    }
    else if(len==13){
        a = this.removeDash(a);
        return a.slice(0, 2)+'-'+a.slice(2, 10)+'-'+ a.slice(10, 12)+'-'+ a.slice(12,13);

    }

}
validation(value, formValidation) {

    let validateResult = {isValid: true};
    if (formValidation) {
            if (typeof value === 'undefined' || !value || Object.keys(value).length == 0 ){
                return ;
            }
            const {accountNumber } =this.state;
            if (accountNumber && accountNumber.length < 13) {
                validateResult = {
                    isValid: false,
                    errorText: businessMessage.errorText.defaultMessage
                }
            }
        
    }

    return validateResult;

}
handleChange = (e) =>{
     const value2 = e.target.value.replace(/[^\d\.]/g, '').substring(0, 13);
     this.setState({accountNumber :value2 }, () => {
        const {accountNumber } =this.state;
        // const normalizedAccountNumber = accountNumber ? accountNumber.replaceAll('-','').replaceAll('_','') : null;
               if (this.props.onChange) {
           this.props.onChange(accountNumber);
       } 
        
    });


}
sendData=(val)=> {
    if(this.props.onChange){
        this.setState({accountNumber :val.accountNumber });
        this.props.onChange(val.accountNumber);
    }
}
  render() {
    return (
      <React.Fragment>
         <FormControlLabel label={this.props.label} isMandatory={this.props.mandatoryPresentational} />
            <GridList gutter={3} >
                <GridTile sm={18}>
                        <TextField
                            errorText={this.props.errorText}
                            id={this.props.id}
                            onChange={this.handleChange}
                            value={this.state.accountNumber}
                            disabled={this.props.disabled}
                            fullWidth={true}
                            onEnter={this.props.onEnter}
                            onBlur={this.props.onBlur}
                            hintText={this.props.label}
                            dir={'ltr'}
                            mandatoryPresentational={this.props.mandatoryPresentational}
                        />
                </GridTile>
                <GridTile sm={6}>
                            <FlatButton
                                label='...'
                                disabled={this.props.disabled}
                                onClick={this.showModal.bind(this)}
                                tooltip='جستجو شماره حساب با استفاده از شماره مشتری'
                                style={{width:'100%',backgroundColor:'#4488af',color:'#fff',fontSize:'18px',fontWeight:'bolder'}}
                            />
                </GridTile>
            </GridList>
      </React.Fragment>
    );
  }
}

export default AccountNumberSearch;
