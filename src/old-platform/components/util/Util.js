/**
 * Created by Ma_Gorji on 2018/10/21.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import {Form, FormGroup, ControlLabel, FormControl,Button, Table , Pagination,Breadcrumb,Modal} from 'react-bootstrap'
import { Link } from 'found';
//import moment from 'moment-jalaali';
//moment.loadPersian();
import config from "../../fconfig";
export const Loading = ({})=> {
    return (
        <div style={{margin:'auto 0'}}>
            <FontAwesome style={{padding: '5px'}}
                         size='3x'
                         spin
                         name='spinner'
            />
        </div>
    );
}
export const Footer = ({version})=> {
    return (
        <footer className="footer">

            <div className="footerText">
                <a href="/entity">
                    <img style={{ paddingTop: '17px',paddingLeft:'10px',height:'45px' }}
                         className="navbar-logo"
                         src="/assets/img/ISC_logo.png"/>

                </a>
                شرکت خدمات انفورماتيک ( توسعه سامانه هاي پايشي ) - نسخه{version}


            </div>

        </footer>
    );
}


export const sessionIdle =  (router) =>{

    if (typeof(window) == 'undefined') {return;}


    var time;
    // DOM Events
    window.addEventListener('load', resetTimer, true);
    var events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(function(name) {
        document.addEventListener(name, resetTimer, true);
    });

    function logout() {
        let ss=store.getState();
        if (ss.notification.notificationStatus){
            console.log ('sessionIdle -- your notification is enabled , hence session Timeout is disabled');

        }else {
            console.log ('sessionIdle -- you are about to logout ')

            fetch(config.serverContextPath + '/api/logout', {
                credentials: 'include', //pass cookies, for authentication
                method: 'get',
            }).then(data => {
                console.log('success data: ', data);
                router.push('/login');
                // this.context.reset();
                // this.props.router.replace('/login');
            }).catch((error) => {
                console.log('error: ', error)
                // this.context.reset();
                // this.props.router.replace('/login');
            });
        }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, config.SessionIdleInterval)
        // 1000 milliseconds = 1 second
    }





}

export const BreadCrumbNavigation = ({routes})=> {

    //const routes2 = ['/', 'first', 'second', 'third'];
    let routes2 = [];
    routes2 = routes.filter((item)=> {
        return item.path != null
    }).map((item)=> {
        return item.path
    })
    console.log(routes2);

    const result = [];

    const reducer = (accumulator, currentValue) => {
        result.push(accumulator);
        return accumulator + '/' +currentValue ;
    }

    // adding final reduced value too.

    result.push(routes2.reduce(reducer));

    console.log(result);


    return (<Breadcrumb>
        {routes.map((item2, index)=> {

            if (index != routes.length - 1 && item2.path != null )
                return (

                    <Breadcrumb.Item key={index}>
                          <Link to={item2.path == null ? '/' : '/'+result[index]} activeClassName="active">
                            {item2.nameFa}
                        </Link>

                    </Breadcrumb.Item>

                );
            else
                return ( <Breadcrumb.Item key={index} active>
                    {item2.nameFa}
                </Breadcrumb.Item>);
        })}
    </Breadcrumb>);
}


export const ReportLabel = ({breadCrumbRoutes,label, color})=> {
    //console.log (moment().format('jYYYY/jMM/jDD HH:mm:ss'));
    return (

        <div className="reportLabel col-md-12">

            <div role="toolbar" className="btn-toolbar toolbar-panel"
                 style={{boxShadow: 'rgb(228, 192, 62) 0px 0px 8px',paddingTop: "12x ",height: '50px',backgroundColor:'ivory'}}>
                {breadCrumbRoutes && <BreadCrumbNavigation routes={breadCrumbRoutes}> </BreadCrumbNavigation>}



            </div>

        </div>
    );
}


export const Notify =  (headerMsg,bodyMsg) => {

    // if (typeof(window) == 'undefined') global.window = new Object();
    if (typeof (window) == 'undefined') {
        return;
    }
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {


        var options = {
            body: bodyMsg,
            imageUrl: "/assets/img/search.png",
            iconUrl: "/assets/img/search.png",
            icon: "/assets/img/business/ISC_BMI_NOTIFY.png",
            dir: "rtl"

        };
        // If it's okay let's create a notification
        var notification = new Notification(headerMsg, options);
        //notification.setAttribute('backgroundcolor','red');
        notification.backgroundColor = 'red';
        setTimeout(function () {
            notification.close.bind(notification);
        }, 300000);
        var audioElement = document.createElement('audio');
        var pp = "/assets/img/ding.mp3";
        audioElement.setAttribute('src', pp);
        // audioElement.play();
        //setTimeout(notification.close.bind(notification), 60000);
        //setTimeout(function() {notification.cancel();}, 60000);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {

        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(headerMsg, options);
                setTimeout(function () {
                    notification.close.bind(notification);
                }, 300000);
                var audioElement = document.createElement('audio');
                var pp = "/assets/img/ding.mp3";
                audioElement.setAttribute('src', pp);
                audioElement.play();
            }
        });
    }


}



export const ConfirmModal = ({msg,title,show,onConfirm,onCancle})=> {
    return (
        <Modal
            show={show}
            dialogClassName="confirmModal"
            size="lg"

        >
            <div style={{margin:'30px',textAlign:'right',width:'200px'}}>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-sm">
                        <div style={{margin:'5px',textAlign:'right'}}>
                            {title}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <div style={{margin:'10px',textAlign:'right',paddingBottom:'10px'}}>
                    {msg}
                </div>
                <Modal.Footer>
                    <Button bsStyle={'danger'} onClick={onConfirm}>تایید</Button>
                    <Button onClick={onCancle} style={{marginRight: '15px',paddingLeft:'5px'}}>انصراف</Button>
                </Modal.Footer>
            </div>

        </Modal>
    );
}