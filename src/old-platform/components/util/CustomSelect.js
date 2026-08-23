import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import {Form, FormGroup, ControlLabel, FormControl,Button, Table , Pagination} from 'react-bootstrap'

//import Select from 'react-select'
import {Select} from 'react-ext'
import DatePicker from 'react-datepicker2'
//import moment from 'moment-jalaali';
//import '../../../node_modules/react-datepicker2/dist/react-datepicker2.min.css';
import FontAwesome from 'react-fontawesome';
import { translate } from '../errorTranslator';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

//moment.loadPersian();

require('isomorphic-fetch');

const headerSortingStyle = {backgroundColor: '#c8e6c9', border: '1px solid', boxShadow: '0 0 8px green'};
const headerStyle = (column, colIndex) => {
    return {backgroundColor: '#e6f5ff', color: '#003d66',};
}


export default class CustomSelect extends Component {


    constructor(props, context) {
        super(props, context);
       var selectedOption = null;
    }


    handleChangeCombo = (selectedOption) => {

            this.props.sendData(selectedOption);
              this.selectedOption = selectedOption;
            //this.setState({
            //    selectedOption: selectedOption,
            //});


    }

    //componentDidUpdate(prevProps){
    //
    //         if ( this.selectedOption != null && this.props.selectedValue != this.selectedOption.value) {
    //             if (this.props.selectedValue == '')
    //                           this.selectedOption= null  ;
    //
    //         }
    //
    //
    //
    //   }



    render() {
        return (
            <div >


                <div className="   col-md-12" style={{paddingBottom: "10px ",width:'100%'}}>

                    <label for="nationalCode" className="col-md-4"
                           style={{float:'right',paddingTop: '5x '}}>
                        {this.props.label}
                    </label>
                    <div className="col-md-8" style={{paddingTop: "5x "}}>
                        <Select
                            isSearchable
                            disabled={ this.props.disabled}
                            value={this.props.data.find( item=> item.value==this.props.selectedValue)}
                            onChange={this.handleChangeCombo}
                            options={this.props.data}
                            className="basic-multi-select"
                            placeholder="انتخاب"
                            isMulti={this.props.isMulti}
                            clearable ={false}
                        />
                    </div>
                </div>





            </div>



        );

    }

}


