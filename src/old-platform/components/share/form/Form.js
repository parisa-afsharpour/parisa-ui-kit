import * as React from 'react'
import TextField from "../textField/TextField"
import RaisedButton from "../raisedButton/RaisedButton"
import Checkbox from "../checkbox/Checkbox"
import {createElement} from "react";
import {findByStringAddress} from "../utils/parser";
import {validate} from "./FormValidation";
import {exist} from "../utils/utils"
import SelectOption from '../selectOption/SelectOption'
import {
    isFlatBusiness, isInput, isButton, isSelectOption,
    isCheckBox,
    isBusiness,
} from "./ElementTypeChecker";
import * as PropTypes from 'prop-types';
import {shallowEqual } from '../utils/object';
import GridTile from '../grid/Col';
import GridList from '../grid/Row';


export function isCallback(action) {
    return 'callback' in action;
}

const contentStyle= {
    margin: "auto",
};
export function elementHasValues(arg){
    return arg.values !== undefined;
}


class Form extends React.Component{
    innerValidators= {};
    validations;
    resetValue= {};

    constructor(props) {
        super(props);
        this.validations = this.extractValidations();
        const elementsValidationStatus= {};
        this.props.elements.forEach(
            element => {
                elementsValidationStatus[element.id] = {};
            });
        this.state = {
            value: {},
            elementsValidationStatus: elementsValidationStatus,
            sectionTitleWidth: 0,
        };
        this.innerValidatorRegistrar = this.innerValidatorRegistrar.bind(this);
        this.handleElementBlur = this.handleElementBlur.bind(this);
        this.simpleInputChange = this.simpleInputChange.bind(this);
        this.simpleWithEventInputChange = this.simpleWithEventInputChange.bind(this);
        this.childValueInputChange = this.childValueInputChange.bind(this);
        this.childValueWithEventInputChange = this.childValueWithEventInputChange.bind(this);
        this.generateContent = this.generateContent.bind(this);
        this.callAction = this.callAction.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateElement = this.validateElement.bind(this);
        this.changeCheckboxValue = this.changeCheckboxValue.bind(this);
        this.getElementValue = this.getElementValue.bind(this);
        this.validateInnerBusinessComponent = this.validateInnerBusinessComponent.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    componentWillMount() {
        let resetValue = Object.assign({}, this.props.resetValue);
        let elements = this.props.elements;

        elements.map((element) => {
            if (!exist(resetValue[element.id])) {
                if ((element ).checkBox) {
                    resetValue[element.id] = false;
                }
                else if (!((element ).divider || (element).button)) {
                    resetValue[element.id] = '';
                }
            }
        });

        let initValue = Object.assign({}, resetValue);

        if (this.props.initValue) {
            initValue = Object.assign(initValue, this.props.initValue);
        }
        if (this.props.value) {
            if (this.props.initValue)
                throw new Error("value property and initValue properties used together, initValue will be ignored.");
            initValue = Object.assign(initValue, this.props.value);
        } else if (this.props.onChange) {
            this.props.onChange(initValue);
        }
        this.resetValue = resetValue;
        this.setState(Object.assign(this.state, {
            value: initValue,
        }));

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let initValue={};
        initValue = Object.assign(initValue, this.props.initValue);
        if (JSON.stringify(this.props.initValue) != JSON.stringify(prevProps.initValue)) {
            if (this.props.initValue) {
                initValue = Object.assign(initValue, this.props.initValue);


                this.setState(Object.assign(this.state, {
                    value: initValue,
                }));
            }
        }
        if (JSON.stringify(this.props.mustClear) != JSON.stringify(prevProps.mustClear)) {
            if (this.props.mustClear) {
                const resetValue = Object.assign({}, this.resetValue);

                let elementsValidationStatus= {};
                this.props.elements.forEach(
                    element => {
                        elementsValidationStatus[element.id] = {};
                    });

                     let value = Object.assign({}, this.resetValue);
                     this.setState({value:value,elementsValidationStatus:elementsValidationStatus})

                if (this.props.onChange) {
                    this.props.onChange(resetValue);
                }
            }
        }
    }

    componentWillReceiveProps_(nextProps) {
        let {elementsValidationStatus , value}  = this.state;

        if(nextProps.elements.length != this.props.elements.length){
            nextProps.elements.forEach((element) =>{
                const elementIsNew = elementsValidationStatus[element.id] == undefined;
                if(elementIsNew){
                    elementsValidationStatus[element.id] = {};
                }
            })
        }

        if (nextProps.mustClear && !this.props.mustClear) {
            const resetValue = Object.assign({}, this.resetValue);

            for(let elementId in elementsValidationStatus){
                elementsValidationStatus[elementId] = {}
            }

            if (!this.props.value) {
                value = Object.assign({}, this.resetValue);
            }

            if (this.props.onChange) {
                this.props.onChange(resetValue);
            }
        } else if (nextProps.value && (this.props.value !== nextProps.value) && (nextProps.value !== this.state.value)) {
            value = Object.assign({}, this.state.value, nextProps.value);
        }

        const elementValidatorChanged = shallowEqual(elementsValidationStatus, this.state.elementsValidationStatus),
            valueChanged = shallowEqual(value,this.state.value);
        if(!elementValidatorChanged || !valueChanged){
            this.setState(prevState => ({
                ...prevState,
                elementsValidationStatus: elementsValidationStatus,
                value : value
            }))
        }
    }

    innerValidatorRegistrar(element, validator){
        this.innerValidators[element.id] = validator;
    }


    handleElementBlur(element) {
        this.validateElement(element);
    }

    validateElement(element) {
        const result = this.validateSingleElement(element);
        if (result) {
            this.setState((prevState, _props) => {
                prevState.elementsValidationStatus[element.id] = result;
                return prevState
            })
        }
    }

    validateSingleElement(element) {
        let externalValidationResult = {isValid: true};
        let innerValidationResult = {isValid: true};
        if(this.validations[element.id] && !element.hasOwnProperty('business')) {
            if (this.validations[element.id].path) {
                externalValidationResult = validate(this.state.value[element.id], this.validations[element.id], this.validations[element.id].path);
            }else{
                externalValidationResult = validate(this.state.value[element.id], this.validations[element.id]);
            }
        }
        if (this.innerValidators[element.id]) {
            innerValidationResult = this.innerValidators[element.id](this.state.value[element.id],element.validate ?element.validate :{});
        }
        if (externalValidationResult && externalValidationResult.isValid && innerValidationResult && innerValidationResult.isValid) {
            if (!this.state.elementsValidationStatus[element.id].isValid && this.state.elementsValidationStatus[element.id].isValid == false)
                return {isValid: true}
        } else {
            if (externalValidationResult.isValid)
                return innerValidationResult;
            else
                return externalValidationResult;
        }
        return undefined;
    }

    validateForm() {
        let isValidate = true;
        this.props.elements.map(
            (element) => {
                const result = this.validateSingleElement(element);
                if (result) {
                    this.state.elementsValidationStatus[element.id] = result;
                    result.isValid !== undefined ? isValidate = result.isValid : undefined;
                }
            }
        );
        if (!isValidate) {
            this.setState(this.state);
        }
        return isValidate;
    }

    simpleInputChange(element, value) {
        let componentsValue = this.state.value;
        if (isFlatBusiness(element)) {
            this.setState(Object.assign(this.state, {
                value: Object.assign(componentsValue, value),
            }));

        } else {
            if (!element.dataAddress) {
                componentsValue[element.id] = value;
            }
            else {
                componentsValue[element.id] = findByStringAddress(value, element.dataAddress);
            }

            this.setState(Object.assign(this.state, {
                value: componentsValue,
            }))
        }
        if (this.state.elementsValidationStatus[element.id].isValid != undefined && this.state.elementsValidationStatus[element.id].isValid == false) {
            this.validateElement(element);
        }
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    onChangeElement(element, _event, value) {
        element.onChange ? element.onChange.call(_event, value) : null;
    }

    childValueInputChange(element, value) {
        this.simpleInputChange(element, value);
    }

    simpleWithEventInputChange(element, _event, value) {
        this.simpleInputChange(element, value);
        this.onChangeElement(element, _event, value);
    }

    childValueWithEventInputChange(element, event, _index) {
        this.childValueInputChange(element, event.props.value);
        this.onChangeElement(element, event, event.props.value);
    }

    changeCheckboxValue(element, _event, isChecked) {
        this.simpleInputChange(element, isChecked);
        this.onChangeElement(element, _event, isChecked);
    }

    validateInnerBusinessComponent(id, result) {
        const elementsValidationStatus = this.state.elementsValidationStatus;
        elementsValidationStatus[id] = result;
        this.setState(Object.assign(this.state, {
            value: this.state.value,
            elementsValidationStatus: elementsValidationStatus
        }));
    }

    extractValidations() {
        const validations = {};
        const elements = this.props.elements;
        elements.map(el => {
            el.validate ? validations[el.id] = el.validate : undefined;
        });
        return validations;
    }


    //TODO: Improve this! (handle flat & composite data)
    async callAction(action) {
        let stateValue = this.state.value;
        if (action.validationRequired == false || this.validateForm()) {
            if(action && action.callback) {
                const callback = action.callback;
                await callback(stateValue);
            }
        }
        else {
            console.error("Form is not valid!");
        }
    }

     handleAction(action) {
        let stateValue = this.state.value;
        if (action.validationRequired == false || this.validateForm()) {
            if (action.onClick){
                action.onClick()
            }
        }
        else {
            console.error("Form is not valid!");
        }
    }


    render() {
        const lgColumnSpan=this.props.columnSpan ? this.props.columnSpan : 4;
        const mdColumnSpan=this.props.columnSpan ? this.props.columnSpan : 3;
        const smColumnSpan=this.props.columnSpan ? this.props.columnSpan : 2;
        const lgColsCount=24/lgColumnSpan;
        const mdColsCount=24/mdColumnSpan;
        const smColsCount=24/smColumnSpan;

        return (
            this.generateContent(lgColsCount,mdColsCount,smColsCount)
        );
    }


    generateContent(lgColsCount,mdColsCount,smColsCount) {
        const fields = this.props.elements;
        const actions = this.props.actions;
        const elementsValidationStatus = this.state.elementsValidationStatus;
        const simpleInputChange = this.simpleInputChange;
        const simpleWithEventInputChange = this.simpleWithEventInputChange;
        const childValueWithEventInputChange = this.childValueWithEventInputChange;
        const changeCheckboxValue = this.changeCheckboxValue;
        const onClick = this.onClick;
        const handleAction = this.handleAction;
        const getElementValue = this.getElementValue;
        const that= this;
        let grids = [];
        let usedColumns= 0;
        let movedToActionBar = {};
        let mainAction = {};
        let i = 0;
        fields.forEach(
            function (currentElement) {
                if(currentElement.hidden) {
                    delete that.state.value[currentElement.id]
                }else {

                    if (isInput(currentElement)) {
                        const inputElement = currentElement;
                        if (!(inputElement.input.type) || inputElement.input.type == 'simple' || inputElement.input.type == 'number'
                            || inputElement.input.type == 'password' || inputElement.input.type =='textarea') {
                            let textField;
                                textField = (
                                    <TextField
                                        id={inputElement.id}
                                        label={inputElement.label}
                                        type={inputElement.input.type}
                                        length={inputElement.input.length}
                                        onChange={simpleWithEventInputChange.bind(that, inputElement)}
                                        value={getElementValue(inputElement)}
                                        hintText={inputElement.input.hintText ? inputElement.input.hintText : ""}
                                        disabled={inputElement.disable ? inputElement.disable : false}
                                        onBlur={that.handleElementBlur.bind(that, inputElement)}
                                        errorText={elementsValidationStatus[inputElement.id].errorText}
                                        mandatoryPresentational={Boolean(inputElement.validate && inputElement.validate.mandatory)}
                                    />
                                );
                            grids.push(
                                <GridTile key={inputElement.id}
                                          lg={inputElement.layout && inputElement.layout.spaceSize ? inputElement.layout.spaceSize.columnSpan * lgColsCount : lgColsCount}
                                          sm={inputElement.layout && inputElement.layout.spaceSize ? inputElement.layout.spaceSize.columnSpan * smColsCount : smColsCount}
                                          md={inputElement.layout && inputElement.layout.spaceSize ? inputElement.layout.spaceSize.columnSpan * mdColsCount : mdColsCount}>
                                    {textField}
                                </GridTile>
                            );
                        }
                        else {
                            throw new Error("invalid input element type!! ,schema is:" + currentElement.toString());
                        }
                    }
                    else if (isButton(currentElement)) {
                        const buttonElement = currentElement;
                        const action= actions ? actions[buttonElement.id] : undefined;
                        const method = () => {
                           handleAction(action);
                        };
                        if (buttonElement.button.isPrimary) {
                            mainAction =  method;
                        }
                        let button = (
                            <RaisedButton
                                key={buttonElement.id}
                                id={buttonElement.id}
                                label={buttonElement.label}
                                type={buttonElement.button.type}
                                disabled={buttonElement.button.isDisabled}
                                onClick={method}
                                onBlur={that.handleElementBlur.bind(that, buttonElement)}
                                style={{...buttonElement.style, marginRight:'7px'}}//TODO : must done with theme concept
                                className={buttonElement.className}
                            />
                        );
                        movedToActionBar[buttonElement.id] = button;

                    }
                    else if (isSelectOption(currentElement)) {

                        const selectOptionElement = currentElement;
                        grids.push(
                            <GridTile key={selectOptionElement.id}
                                      lg={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * lgColsCount : lgColsCount}
                                      sm={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * smColsCount : smColsCount}
                                      md={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * mdColsCount : mdColsCount}>
                                <SelectOption
                                    id={selectOptionElement.id}
                                    label={selectOptionElement.label}
                                    value={getElementValue(selectOptionElement)}
                                    onChange={simpleWithEventInputChange.bind(that, selectOptionElement)}
                                    values={selectOptionElement.option.values}
                                    disabled={!elementHasValues(selectOptionElement) || selectOptionElement.disable ? selectOptionElement.disable : false}
                                    onBlur={that.handleElementBlur.bind(that, selectOptionElement)}
                                    errorText={elementsValidationStatus[selectOptionElement.id].errorText}
                                    isComposite={selectOptionElement.option.composite}
                                    multiple={(selectOptionElement.option.type) && selectOptionElement.option.type == 'multiple'}
                                    headValue={selectOptionElement.option.headValue}
                                    mandatoryPresentational={Boolean(selectOptionElement.validate && selectOptionElement.validate.mandatory)}
                                />
                           </GridTile>
                        );
                    }
                    else if (isCheckBox(currentElement)) {
                        const checkBoxElement = currentElement ;
                        // TODO remove style
                        let checkbox = (
                            <Checkbox
                                id={checkBoxElement.id}
                                label={checkBoxElement.label}
                                checked={getElementValue(checkBoxElement)}
                                onCheck={changeCheckboxValue.bind(that, checkBoxElement)}
                                disabled={checkBoxElement.disable ? checkBoxElement.disable : false}
                                style={{marginTop: '28px'}}
                                withOutHeight={true}

                            />
                        );
                        grids.push(<GridTile key={checkBoxElement.id}
                                             lg={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * lgColsCount : lgColsCount}
                                             sm={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * smColsCount : smColsCount}
                                             md={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.columnSpan * mdColsCount : mdColsCount}>
                                {checkbox}
                            </GridTile>
                        );
                    }
                    else if (isBusiness(currentElement)) {
                        const businessElement = currentElement;
                        const elemProps = {
                            id: businessElement.id,
                            label: businessElement.label,
                            value: getElementValue(businessElement),
                            onChange: businessElement.onChange ? businessElement.onChange.bind(that) : simpleInputChange.bind(that, businessElement),
                            disabled: businessElement.disable ? businessElement.disable : false,
                            disabledDate:businessElement.disabledDate?businessElement.disabledDate:false,
                            onBlur: that.handleElementBlur.bind(that, businessElement),
                            validatorRegistrar: that.innerValidatorRegistrar.bind(that, businessElement),
                            errorText: elementsValidationStatus[businessElement.id].errorText,
                            buildData:businessElement.business.buildData,
                            mandatoryPresentational:Boolean(businessElement.validate && businessElement.validate.mandatory),
                             showSecond:businessElement.business.buildData && !businessElement.business.buildData.showSecond ?businessElement.business.buildData.showSecond:true ,
                        };

                        grids.push(<GridTile key={businessElement.id}
                                             lg={businessElement.layout && businessElement.layout.spaceSize ? businessElement.layout.spaceSize.columnSpan * lgColsCount : lgColsCount}
                                             sm={businessElement.layout && businessElement.layout.spaceSize ? businessElement.layout.spaceSize.columnSpan * smColsCount : smColsCount}
                                             md={businessElement.layout && businessElement.layout.spaceSize ? businessElement.layout.spaceSize.columnSpan * mdColsCount : mdColsCount}
                        >
                            {createElement(businessElement.business.element, elemProps)} </GridTile>);
                    }
                    else {
                        throw new Error("unsupported component! ,schema is:" + JSON.stringify(currentElement));
                    }
                }
                if (currentElement.layout && currentElement.layout.spaceSize && currentElement.layout.spaceSize.columnSpan) {
                    usedColumns = usedColumns + currentElement.layout.spaceSize.columnSpan;
                } else {
                    if (!(currentElement.divider)) {
                        usedColumns = usedColumns + 1;
                    }
                }
                if (currentElement.layout && currentElement.layout.endPoint && currentElement.layout.endPoint === true) {
                    let available = lgColsCount - usedColumns;
                    grids.push(<GridTile
                        key={currentElement.id + (i++)}
                        rows={currentElement.layout && currentElement.layout.spaceSize ? currentElement.layout.spaceSize.rowSpan : undefined}
                        cols={available}/>);
                    usedColumns = 0;
                }
                if (usedColumns === lgColsCount) {
                    usedColumns = 0;
                }
            }
        );
        let gridList=(<GridList cols={lgColsCount} cellHeight={75}>
            {grids}
        </GridList>);

        let currentActions = Object.keys(movedToActionBar).map((id) => {
            return movedToActionBar[id];
        });

            return <div id={this.props.id} style={contentStyle}>
                {gridList}
                <div className={this.props.actions.className} style={{
                    marginRight: "auto",
                    display: 'table',
                }}>
                    {currentActions}
                </div>
            </div>

    }

    getElementValue(element) {
        let value = this.state.value;
        if (isCheckBox(element))
            return value[element.id] != undefined ? value[element.id] : false;
        return value[element.id] != undefined ? value[element.id] : ''
    }
}

/*============ type check ======================== */
Form.propTypes = {
    id: PropTypes.string.isRequired,
    columnSpan: PropTypes.number,
    elements:PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({//Input
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                input: PropTypes.shape({
                    type:PropTypes.oneOfType([
                        'simple','password','number','textarea'
                    ]),
                    length:PropTypes.number
                }).isRequired,
                layout:PropTypes.shape({
                    spaceSize:PropTypes.shape({
                        columnSpan:PropTypes.string
                    }),
                    endPoint:PropTypes.bool
                }),
                validate:PropTypes.shape({
                    mandatory:PropTypes.bool,
                    //TODO:continue
                })
            }),
            PropTypes.shape({//selectOption
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                option: PropTypes.shape({
                    values:PropTypes.arrayOf(
                        PropTypes.shape({
                            text:PropTypes.any,
                            Value:PropTypes.any,
                        })
                    )
                }).isRequired,
                layout:PropTypes.shape({
                    spaceSize:PropTypes.shape({
                        columnSpan:PropTypes.string
                    }),
                    endPoint:PropTypes.bool
                }),
                validate:PropTypes.shape({
                    mandatory:PropTypes.bool,
                    //TODO:continue
                })
            }),
            PropTypes.shape({//selectOption
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                checkbox: PropTypes.shape({}).isRequired,
                layout:PropTypes.shape({
                    spaceSize:PropTypes.shape({
                        columnSpan:PropTypes.string
                    }),
                    endPoint:PropTypes.bool
                }),
                validate:PropTypes.shape({
                    mandatory:PropTypes.bool,
                    //TODO:continue
                })
            }),
            PropTypes.shape({//selectOption
                id: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                business: PropTypes.shape({
                    element:PropTypes.any
                }).isRequired,
                layout:PropTypes.shape({
                    spaceSize:PropTypes.shape({
                        columnSpan:PropTypes.string
                    }),
                    endPoint:PropTypes.bool
                }),
                validate:PropTypes.shape({
                    mandatory:PropTypes.bool,
                    //TODO:continue
                })
            }),
        ]
    )),
    actions: PropTypes.objectOf({
        onClick:PropTypes.func.isRequired,
        validationRequired:PropTypes.bool
    }),
    resetValue:PropTypes.object,//when form reset, this value are used.
    initValue:PropTypes.object,//initial value
    value:PropTypes.object,//Has been used in the stateless mode.
    onChange:PropTypes.func,
    mustClear:PropTypes.bool,

};


export default Form;