import * as React from 'react'
import {Tooltip, Menu, Badge, Divider} from 'antd';
const { SubMenu } = Menu;
import ProfileContent from "./profile/ProfileContent";
import FontAwesome from "react-fontawesome";
import withRouter from "found/lib/withRouter";
import * as loginactions from "../../../../user-management/actions/userInfoActions";
import {AppContext} from "../../../context";
import {connect} from "react-redux";
import styles from './header.scss';
import config from "../../../fconfig";
import * as notifActions from "../../../../sina/actions/notificationActions";
import store from "../../../client";
import {commonFetchData} from "../../../../samab/utils/RestFetcher";
import {isPermittedAny} from 'react-ext/lib/auth/SecurityTags';//TODO: later change it
import PERMISSIONS from "../../../permissions";

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
        this._handleSelect=this._handleSelect.bind(this);
        this.startNotification=this.startNotification.bind(this);
        this.stopNotification=this.stopNotification.bind(this);
    }
    state = {
        collapsed: false,
    };
    componentDidMount=async ()=> {
        let dataFromAction;
        /*______________________ NOTIFICATION REQ___________________*/

        /*let url = `${config.ServerUrl}notification/get-notif-Info `;
        let that = this;
        let params = {
            url: url
        };
        await commonFetchData(params, this.props).then(function (data) {

            if(data){
                if(data.notifStatus && data.notifStatus===true ){
                    store.dispatch(notifActions.receiveNotificationStart());
                    that.fetchUnReadCount();
                }else{
                    store.dispatch(notifActions.receiveNotificationStop());
                }
            }
        });*/
        /*______________________ NOTIFICATION REQ___________________*/

        if (typeof(window) != 'undefined') {
            let notifSession=window.sessionStorage.getItem('notifStatus');
            if(notifSession){
                await     that.startNotification();
                store.dispatch(notifActions.receiveNotificationStart());
            }
        }
        /*--------------------notification count----------------------*/
    };
    fetchUnReadCount = async () => {
        let data2;
        let url = `${config.ServerUrl}notification/get-unread-message`;
        let params = {
            url: url,
        };
        let dataFromAction2 = async () => {
            return await this.props.getNotificationsCount(params);
        };
        dataFromAction2().then(function (data4) {
            data2=data4
        });

    };
    handleSelect = (eventKey) => {
        this.props.router.push(eventKey);
    };
    _handleSelect = (eventKey, event) => {
        this.props.router.push(eventKey);
    };

    startNotification(){
        if (typeof(window) != 'undefined')
            window.sessionStorage.setItem('notifStatus', 'true');

        let that = this;
        let data2;
        let  url2 = `${config.ServerUrl}notification/start`;
        let params = {
            url: url2,

        }
        let dataFromAction2 = async () => {
            return await this.props.getNotificationStart(params);
        };
        dataFromAction2().then(function (data4) {
            data2 = data4;
        });
        that.fetchUnReadCount();
    }

    stopNotification(){
        if (typeof(window) != 'undefined') {
            window.sessionStorage.removeItem('notifStatus');
        }
        let data;
        let that = this;
        let data2;
        let  url2 = `${config.ServerUrl}notification/stop`;
        let params = {
            url: url2,

        }
        let dataFromAction2 = async () => {
            return await this.props.getNotificationStop(params);
        };
        dataFromAction2().then(function (data4) {
            data2 = data4;
        });
    }

    render() {
        let notifStatus = false;
        const {permissions} = this.props;
        if (typeof(window) != 'undefined'){
            notifStatus =window.sessionStorage.getItem('notifStatus');

        }
        return (
            <Menu mode="horizontal" className={styles.headerMenu}>
                {/*______________________________________________________________________________________________*/}

                <SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                                <FontAwesome name='user-o' style={{marginLeft:'5px'}}/>
                            {this.props.authenticated && this.props.principal ? (<span>{this.props.principal.login}</span>) : 'کاربر مهمان'}
                                </span>
                    }
                >
                    <Menu.Item  key="setting:1" style={{height:'auto', boxShadow: 'rgb(165, 165, 165) 0px 0px 11px 0px'}}>
                        <ProfileContent principal={this.props.principal}/>
                    </Menu.Item>
                </SubMenu>
                {this.props.authenticated &&
                <Menu.Item key="logout" eventKey="/logout"
                           onClick={this.handleSelect.bind(this, '/logout')}>
                    <Tooltip title={'خروج'} placement={'bottom'}>
                        <FontAwesome name='sign-out' size={'lg'} style={{transform: 'rotate(180deg)'}}/>
                    </Tooltip>
                </Menu.Item>
                }
                {!this.props.authenticated && <Menu.Item key="login" eventKey="/login"
                                                         onClick={this._handleSelect.bind(this, '/login')}>
                    <Tooltip title={'ورود'} placement={'bottom'}>
                        <FontAwesome name='sign-in' style={{transform: 'rotate(180deg)'}}/>
                    </Tooltip>
                </Menu.Item>
                }
            </Menu>
        )
    }
}
const select = (state) => ({
    user: state.userInfo.user,
    notifications : state.notification.notifications,
    reportMetaData: state.notification.reportMetaData,
    notificationStatus:state.notification.notificationStatus,
    notifUnReadCount:state.notification.notifUnReadCount
});


const action = (dispatch) => ({
    getUserData: (params) => {
        return dispatch(loginactions.getUserData(params))
    },
    getNotificationStart: async (params) => {
        return await dispatch(notifActions.getNotificationStart(params))
    },
    getNotificationStop: async (params) => {
        return await dispatch(notifActions.getNotificationStop(params))
    },
    getNotifUnReadCount: async (params) => {
        return await dispatch(notifActions.getNotifUnReadCount(params))
    },
    getNotificationsCount: async (params) => {
        return await dispatch(notifActions.getNotificationsCount(params))
    },
    dispatch,
});
HeaderMenu.contextType = AppContext;
export default connect(select, action)(withRouter(HeaderMenu));

