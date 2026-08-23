import * as React from 'react';
import { Modal as AntModal } from 'antd';
import * as popupActions from '../../../actions/modalActions';
import store from '../../../client';
import Draggable from "react-draggable";
import {findDOMNode} from "react-dom";
import DragM from "dragm";

class BuildTitle extends React.Component {
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr;
    };
    componentDidMount() {
        const modalArray=document.getElementsByClassName(
            "ant-modal-wrap"
        );
        this.modalDom=modalArray[modalArray.length - 1]
    }
    render() {
        const { title } = this.props;
        return (
            <DragM updateTransform={this.updateTransform}>
                <div>{title}</div>
            </DragM>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.state = {
            open: true,
        };
    }

    handleCloseModal() {
        //before close
        if (this.props.closeModal) {
            this.props.closeModal();
        }
        this.setState({open: false});
        //after close
        if (this.props.afterClose) {
            this.props.afterClose();
        }
    }

    render() {
        const {draggable ,title ,width}=this.props;
        const titleComponent =<BuildTitle visible={this.state.visible} title={title} modal={this.modal} />;

        return (
            <Draggable>
                <AntModal
                        visible={this.state.open}
                        title={draggable ? titleComponent : title}
                        onCancel={this.handleCloseModal}
                        width={width ? width : 820}
                        maskClosable={false}
                        footer={''}
                >
                    {this.props.children}
                </AntModal>
            </Draggable>
        );}
}
export default Modal;



