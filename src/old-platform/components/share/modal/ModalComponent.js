import * as React from "react";
import { bindActionCreators, Dispatch as ReduxDispatch } from "redux";
import { connect } from "react-redux";
import * as modalActions from "../../../actions/modalActions";
import Modal from "./Modal";
import store from "../../../client";

class ModalComponent extends React.PureComponent {

    handleCloseModal=()=>{
        if (this.props.closeModal){
            this.props.closeModal();
        }
        store.dispatch(modalActions.hide());
    }

    render() {
        return this.props.component ? (
            <Modal
                children={this.props.component}
                title={this.props.title}
                closeModal={this.handleCloseModal}
            />
        ) : null;
    }
}


const mapStateToProps = (state) => ({
    component: state.modal.component,
    title: state.modal.title,
    closeModal:state.modal.closeModal,
});

const mapDispatchToProps = (dispatch) =>
{bindActionCreators(
    {
        closeModal: () => modalActions.hide(),
    },
    dispatch,
);}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ModalComponent);

