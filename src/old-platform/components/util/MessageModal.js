import React from 'react';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import Modal from 'react-overlays/lib/Modal';
import FontAwesome from 'react-fontawesome';
//import Draggable from 'react-draggable';


let rand = ()=> (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function(count) {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 40 + count;
  let left = 40 + count;

  return {
    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    borderRadius: '10px',
    marginTop: '10px',
    padding: 20
  };
};

let count = 10;

class MessageModal extends React.Component {

  constructor(props) {
    super(props);

    this.count = count++;
  }


  render() {

    return (
      <div className='modal-example'>

        <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={true}
          backdrop="static"
          keyboard={false}

        >
          <div style={dialogStyle(this.count)} >
            <h4 id='modal-label'>{this.props.icon} {this.props.title}</h4>
            <p>{this.props.message}</p>
            {this.props.buttons}
          </div>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    count--;
  }

}

export default MessageModal;
