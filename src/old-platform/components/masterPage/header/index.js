import * as React from 'react'
import {Layout, Icon} from 'antd';
import HeaderMenu from "./HeaderMenu";
import styles from './header.scss';
import store from "../../../client";
import * as toggleMenuActions from "../../../../sina/actions/toggleMenuAction";
import bconfig from'../../../bconfig'

class Index extends React.Component {
    state = {
        collapsed: false,
    };
  
    resize = () => {
        if(window.innerWidth <= 960){
            this.setState({
                collapsed: true,
            });
            if (this.props.toggleMenu){
                this.props.toggleMenu(true)
            }
        }
        else{
            this.setState({
                collapsed: false,
            }); 
            if (this.props.toggleMenu){
                this.props.toggleMenu(false)
            }
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.resize)
      }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        if (this.props.toggleMenu){
            this.props.toggleMenu(!this.state.collapsed);//TODO: remove this line
            this.state.collapsed ? store.dispatch(toggleMenuActions.openMenu()) :store.dispatch(toggleMenuActions.closeMenu())
        }
    };

     render() {
        const {collapsed}=this.state;
        const width=!collapsed ? '240px' :'80px';

        return (
            <Layout.Header className={styles.header +' ' +'hidden-print'}>
                <div style={{width:`${width}`}} className={styles.logo}>
                    <img alt={bconfig.title} className={styles.iconLogo} src="/assets/img/business/bankLogo.png"/>
                    {/*{!collapsed && <img alt={bconfig.title} className={styles.textLogo} src="/assets/img/business/bankName.png"/>}*/}
                </div>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <span className={styles.samab}> سامانه شاهیار (شاهین یار)</span>
                <HeaderMenu authenticated={this.props.authenticated} permissions={this.props.permissions} principal={this.props.principal} />
            </Layout.Header>
        )
    }
}

export default Index;

