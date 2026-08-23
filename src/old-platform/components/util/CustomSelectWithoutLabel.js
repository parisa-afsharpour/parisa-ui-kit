import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import {Form, FormGroup, ControlLabel, FormControl,Button, Table , Pagination} from 'react-bootstrap'
import {Select} from 'react-ext'
import DatePicker from 'react-datepicker2'
//import moment from 'moment-jalaali';
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
    };

    render() {
        return (
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
        );
    }
}


