import React from 'react';
import PropTypes from 'prop-types';
import RowActions from './RowActions';
import DropDownActions from './DropDownActions';
import * as ReactDOM from "react-dom";

class Actions extends React.Component {
    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            onClick: PropTypes.func,
            tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            color:PropTypes.string
        })),
        refreshEveryUpdate: PropTypes.number,
        squareButton:PropTypes.bool,
        size:PropTypes.string
    };

    constructor(props){
        super(props);
        this.state = {
            parentWidth:  0,
        }
    }

    componentDidMount() {
        const elem = ReactDOM.findDOMNode(this);
        const parentWidth = elem.parentElement.clientWidth;
        this.setState({parentWidth})
    }

    componentDidUpdate(prevProps, prevState) {
            const { parentWidth } = prevState;
            const elem = ReactDOM.findDOMNode(this);
            const _parentWidth = elem.parentElement.clientWidth;
            if(_parentWidth != parentWidth){
                this.setState({parentWidth: _parentWidth})
            }
    }

    getRequiredWidth(actions){
        let requireWidth = 0;
        if(Array.isArray(actions) && actions.length){
            requireWidth = actions.length * 45; // TODO: 45 is default for icons size and theirs margins, calculate real size in future
        }
        return requireWidth;
    }

    render(){
        const { parentWidth } = this.state,
            { actions=[],squareButton,size} = this.props,
            requiredWidth = this.getRequiredWidth(actions);

        return(
            <RowActions squareButton={squareButton} actions={actions} size={size}/>
            /*requiredWidth > parentWidth ? <DropDownActions actions={actions}/> : <RowActions squareButton={squareButton} actions={actions}/>*/
        );
    }
}

export default  Actions;