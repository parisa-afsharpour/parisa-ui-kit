import React from "react";
import Center from './center/Center';
import SideMenu from './SideMenu';
import { Layout, Menu,Select } from 'antd';
import get from "lodash.get";
import Header from "./header";
const {  Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
import Scrollbar from 'react-scrollbars-custom'
import {connect} from "react-redux";
import DesktopNotification from "../../../sina/components/notification/DesktopNotification";


class MasterPage extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        collapsed: false,
    }

    _getLoggedInName = (principal) => {
        if (get(principal, 'firstName') != null && get(principal, 'lastName') != null) {
            return `${get(principal, 'firstName')} ${get(principal, 'lastName')}`;
        } else {
            return `${get(principal, 'login')}`
        }

    };

    handleToggleMenu=(collapsed)=>{
        this.setState({
            collapsed: collapsed,
        });
    };


    render(){
        const {collapsed}=this.state;
        return(
            // <Scrollbar  style={{ height: '100vh' }}
            // renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
            // renderTrackVertical={props => <div {...props} className="track-vertical"/>}
            // renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
            // renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
            // renderView={props => <div {...props} className="view"/>}>

            <Layout style={{minHeight: '100vh'}}>
                <DesktopNotification start={this.props.notificationStatus} />
                <Header authenticated={this.props.authenticated} permissions={this.props.permissions} principal={this.props.principal} toggleMenu={this.handleToggleMenu}/>
                <Layout style={{marginTop:'50px'}}>
                    <SideMenu collapsed={collapsed} permissions={this.props.permissions} routs={this.props.routs}/>
                    <Center collapsed={collapsed} children={this.props.children} routs={this.props.routs}/>
                </Layout>
            </Layout>

        )
    }
}
const select = (state) => ({
    notificationStatus:state.notification.notificationStatus,

})
export default connect(select)(MasterPage);
