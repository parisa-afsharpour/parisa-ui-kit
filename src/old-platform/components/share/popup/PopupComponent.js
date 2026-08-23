import * as React from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
/*import store from "../../../client";*/
import * as popupActions from "../../../actions/popupActions";

class PopupComponent extends React.PureComponent{


    render() {
        if (this.props.popupObjects.length > 0){
            return getPopups(this.props.dispatch,this.props.popupObjects, this.props.popupOwnProps)
        }
        return null
    }
}

function mapStateToProps(state) {
    return {
        mainComponent: state.component,
        popupObjects: state.popup.popupObjects,
        popupOwnProps: state.popup.popupOwnProps,
    };
}
export default connect(mapStateToProps)(PopupComponent);

const getPopups = (dispatch,popupObjects, ownProps) => {
    if (Array.isArray(popupObjects)) {
        const popupLength=popupObjects.length;
        return popupObjects.map((elm, i) => {
            return (
                <Modal
                       children={elm}
                       title={ownProps[i].title}
                       draggable={popupLength === (i+1)}
                       closeModal={()=>{
                           dispatch(popupActions.close(elm.type));
                           ownProps[i].onBeforeClose && ownProps[i].onBeforeClose()
                       }}
                       afterClose={ownProps[i].onAfterClose}
                       width={'85%'}
                />
            );
        });
    }
    return [];
};
