import * as React from 'react';
import TextField from '../textField/TextField';
import FlatButton from '../flatButton/FlatButton';
import { exist } from '../utils/utils';
import PropTypes from 'prop-types'
import {Tooltip} from 'antd'
import GridTile from '../grid/Col';
import GridList from '../grid/Row'
import FormControlLabel from "../formControlLabel/FormControlLabel";

const styles = ()=> ({
    inputStyle: {
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
    },
    container: {
        main: {display: 'flex'},
        textField: {width: '100%'},
    },
    buttonStyle: {
        marginTop: -4,
        width: 50,
        padding: 0,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
    },
    parentButtonStyle: {
        margin: 'auto 0',
    },
});

class InputGroup extends React.Component {
    buttonRef = React.createRef();
    constructor (props) {
        super(props);
    }
    static propTypes = {
        id:PropTypes.string,
        label:PropTypes.string,
        onChange:PropTypes.func,
    onEnter:PropTypes.func,
    onBlur:PropTypes.func,
    onClick:PropTypes.func,
    value:PropTypes.any,
    disabled:PropTypes.bool,
    errorText:PropTypes.string,
    hintText:PropTypes.string,
    icon:PropTypes.string,
    mandatoryPresentational:PropTypes.string,
    style: PropTypes.object,
        buttonTooltip:PropTypes.string,
        inputDisabled:PropTypes.bool
    };

    getTargetButton = () => {
        const currentElement = this.buttonRef.current;
        const button = currentElement.querySelector('button');
        if (button) {
            return button;
        }

        return null;
    };

    handleClick = () => {
        this.props.onClick();
        const buttonElement = this.getTargetButton();
        if (exist(buttonElement)) {
            buttonElement.blur();
        }
    }

    render () {
        const {buttonTooltip,buttonFontSiz,inputDisabled } = this.props;

        return (
            <React.Fragment>
            <FormControlLabel label={this.props.label} isMandatory={this.props.mandatoryPresentational} />
            <GridList gutter={3} >

                <GridTile sm={18}>
                        <TextField
                            errorText={this.props.errorText}
                            id={this.props.id}
                            onChange={this.props.onChange}
                            value={this.props.value}
                            disabled={inputDisabled == false ? inputDisabled :true}
                            fullWidth={true}
                            onEnter={this.props.onEnter}
                            onBlur={this.props.onBlur}
                            hintText={this.props.label}
                        />
                </GridTile>
                <GridTile sm={6}>
                    <Tooltip title={!this.props.disabled ? buttonTooltip :''} placement={'bottom'}>
                     <span ref={this.buttonRef}>
                            <FlatButton
                                label={this.props.buttonLabel}
                                disabled={this.props.disabled}
                                onClick={this.handleClick}
                                style={{width:'100%',
                                    backgroundColor:'#098091',
                                    color:'#fff',
                                    fontSize:`${buttonFontSiz ? buttonFontSiz : '18px'}`,
                                    fontWeight:'bolder'}}
                            />
                        </span>
                    </Tooltip>
                </GridTile>
            </GridList>
            </React.Fragment>

        );
    }
}

export default InputGroup;