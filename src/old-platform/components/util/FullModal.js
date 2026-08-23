import React from 'react';
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import Modal from 'react-overlays/lib/Modal';
import FontAwesome from 'react-fontawesome';
import Draggable from 'react-draggable';
//import CSSModules from 'react-css-modules';
//import styles from './FullModal.scss';

const defaultProps = {
  topButtonBar: true,
}

//using top/left with translation: https://stackoverflow.com/questions/42575016/translate-vs-top-left-for-positioning

/*
CSS styles for close X

display: inline-block;
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 20px;
    color: #fff;
 */


let rand = ()=> (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
  //backgroundImage: 'url("/assets/img/noise.png")'
};


const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const smallDialogStyleWithOffset = function(count /*, offsetX, offsetY*/) {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  //let top = 1 + offsetX;//50 + offsetX
  //let left = 1 + offsetX;//50 + offsetY;

  let top = count;//offsetX;//50 + offsetX
  let left = count;//offsetX;//50 + offsetY;


  console.log('top: ', top, 'left: ', left, ' viewPort width:  ', getViewport().width, ' viewport height: ', getViewport().height);

  return {
    position: 'absolute',
    //width: '900px',
    //height:'700px',
    //width: (+getViewport() - left) + 'px',
    //height: (+getViewport().height) - top + 'px',
    width: '70%',
    height: '70%',
    top: top + '%', left: left + '%',
    //transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'grey',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '5px',

    marginTop: '20px',



    //overflowY: 'scroll',
    //overflow: '-moz-scrollbars-vertical',
    //top:15, left: 15,
    //bottom: 15, right: 15,
  };
};


const smallDialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 50 + rand();
  let left = 50 + rand();

  console.log('top: ', top, 'left: ', left, ' viewPort width:  ', getViewport().width, ' viewport height: ', getViewport().height);

  return {
    position: 'absolute',
    //width: '900px',
    //height:'700px',
    //width: (+getViewport() - left) + 'px',
    //height: (+getViewport().height) - top + 'px',
    width: '70%',
    height: '70%',
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'grey',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '5px',

    marginTop: '20px',



    //overflowY: 'scroll',
    //overflow: '-moz-scrollbars-vertical',
    //top:15, left: 15,
    //bottom: 15, right: 15,
  };
};

const fullPageDialogStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.
  let top = 0;
  let left = 0;

  console.log('top: ', top, 'left: ', left, ' viewPort width:  ', getViewport().width, ' viewport height: ', getViewport().height);

  return {
    position: 'fixed',
    //width: '900px',
    //height:'700px',
    //width: (+getViewport() - left) + 'px',
    //height: (+getViewport().height) - top + 'px',
    width: '100%',
    height: '100%',
    top: top + '%', left: left + '%',
    //transform: `translate(-${top}%, -${left}%)`,
    transform: 'translate(0, 0)',
    border: '1px solid #e5e5e5',
    //backgroundColor: 'grey',
    backgroundColor: 'rgb(255,255,255)',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: '5px',

    //marginTop: '20px',



    //overflowY: 'scroll',
    //overflow: '-moz-scrollbars-vertical',
    //top:15, left: 15,
    //bottom: 15, right: 15,
  };
};



// const dialogStyle = function() {
//   // we use some psuedo random coords so nested modals
//   // don't sit right on top of each other.
//   let top = 0;
//   let left = 0;

//   console.log('top: ', top, 'left: ', left, ' viewPort width:  ', getViewport().width, ' viewport height: ', getViewport().height);

//   return {
//     position: 'fixed',
//     //width: '900px',
//     //height:'700px',
//     //width: (+getViewport() - left) + 'px',
//     //height: (+getViewport().height) - top + 'px',
//     width: '100%',
//     height: '100%',
//     top: top + '%', left: left + '%',
//     //transform: `translate(-${top}%, -${left}%)`,
//     border: '1px solid #e5e5e5',
//     backgroundColor: 'grey',
//     boxShadow: '0 5px 15px rgba(0,0,0,.5)',
//     padding: '5px',

//     //marginTop: '20px',



//     //overflowY: 'scroll',
//     //overflow: '-moz-scrollbars-vertical',
//     //top:15, left: 15,
//     //bottom: 15, right: 15,
//   };
// };


//wrap Div.dialog with <Draggable handle=".dialog" enableUserSelectHack={false}> to make it draggable.
//userSelectHack: https://github.com/mzabriskie/react-draggable/issues/289
//
//the problem with draggable is that it resets the transform to 0 so the
//modal will always be at the bottom-right corner of the screen and some parts hidden.
//see this issue: https://github.com/mzabriskie/react-draggable/issues/223

//changing random modal position to deterministic. x and y of the modal is in relation with its count number. also see
//https://github.com/facebook/react/issues/1137
//about unique react component instance ID.
let count = 10;

class FullModal extends React.Component {

  constructor(props) {
    super(props);

    this.count = count++;
  }

  state = {
    // showModal: this.props.show,
    fullPage: this.props.fullPage ? true : false,
  }

  //   render2() {

  //   return (
  //     <div>
  //         <Modal
  //           aria-labelledby='modal-label'
  //           style={modalStyle}
  //           backdropStyle={backdropStyle}
  //           show={this.props.show}
  //           onHide={this.close}
  //           backdrop="static"
  //           onEscapeKeyUp={this._handleClose}
  //           containerClassName="back-fixed"
  //         >
  //           <div className="h100">

  //           <div className="dialog" style={dialogStyle()} >

  //             <div style={{height: '5%', backgroundColor: 'blue', /*maxHeight: '500px', minHeight: '500px'*/}}>
  //               <div style={{marginTop: '2px'}}>
  //                 {this.props.buttons}
  //               </div>
  //             </div>

  //             <div className="dialog-content">
  //               <div style={{overflowY: 'scroll', height: '95%', /*maxHeight: '500px', minHeight: '500px'*/}}>
  //                 {this.props.children}
  //               </div>
  //             </div>

  //           </div>
  //         </div>
  //         </Modal>
  //     </div>
  //   );
  // }

  componentDidMount() {
  }

  componentWillUnmount() {
    count--;
  }

  _handleDoubleClick = (e) => {
    e.preventDefault();
    this.setState({fullPage: !this.state.fullPage});
  }

  /*

  wrap Div.dialog with <Draggable handle=".dialog" enableUserSelectHack={false}> to make it draggable.
  enableUserSelectHack={false}: https://github.com/mzabriskie/react-draggable/issues/289
    - by default, input selection is set to null. use this to make it selectable

  use position in case of full page to revert the draggable transform. otherwise, transform is applied to full size too.
  view DraggableCore for props documentation.

  TODO use fa expand/compress or maximize/minimize icons.
  */

  render() {

    let dialogStyle = this.state.fullPage ? fullPageDialogStyle() : smallDialogStyleWithOffset(this.count);
    let topButtonBar = this.props.topButtonBar ? true : false;

    return (
      <div styleName="wrap">
          <Modal
            aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={this.props.show}
            onHide={this.close}
            backdrop="static"
            onEscapeKeyUp={this._handleClose}
            containerClassName="back-fixed"
          >
            <div className="h100">

            <Draggable handle=".dialog-title-bar"  enableUserSelectHack={false} disabled={this.state.fullPage} position={this.state.fullPage ? {x: 0,y: 0} : null}>
              <div className="dialog" style={dialogStyle}>

            { topButtonBar &&
              <div className="dialog-title-bar" style={{height: '40px', backgroundColor: '#0000ff4a', cursor: 'move', /*maxHeight: '500px', minHeight: '500px'*/}} onDoubleClick={this._handleDoubleClick}>
                <div style={{paddingTop: '2px'}}>
                  <a href="#" onClick={this._handleClose} ><FontAwesome name="window-close" style={{
                    fontSize: '20px',
                    color: 'white',
                    marginRight: '10px',
                    marginTop: '5px',}} /></a>
                  <a href="#" onClick={this._handleDoubleClick}><FontAwesome name={this.state.fullPage? "window-restore" : "window-maximize"} style={{
                    fontSize: '20px',
                    color: 'white',
                    marginRight: '10px',
                    marginTop: '5px',}} /></a>
                </div>
              </div>
            }
              <div className="dialog-content" style={{overflowY: 'scroll', height: 'calc(100% - 40px)', backgroundColor: 'white', /*maxHeight: '500px', minHeight: '500px'*/}}>
                {this.props.children}
              </div>

            { !topButtonBar &&
              <div style={{height: '40px', backgroundColor: '#0000ff4a', /*maxHeight: '500px', minHeight: '500px'*/}} onDoubleClick={this._handleDoubleClick}>
                <div style={{paddingTop: '2px'}}>
                  {this.props.buttons}
                </div>
              </div>
            }

            </div></Draggable>
          </div>
          </Modal>
      </div>
    );
  }

  _handleClose = (e) => {
    console.log('close requested');
    e.preventDefault();
    if (this.props.onClose) {
      this.props.onClose.call();
    }

    // this.setState({showModal: false});
  }

};

const getViewport = function() {

 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 //return [viewPortWidth, viewPortHeight];
 return {width: viewPortWidth, height: viewPortHeight};
}

FullModal.defaultProps=defaultProps;

//export default CSSModules(FullModal, styles);
export default FullModal;
