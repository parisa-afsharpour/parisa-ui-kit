import React from "react";
import {Menu, Icon, Layout} from 'antd';
import {routs as menuItems} from './menuRouter'
import withRouter from "found/lib/withRouter";
import {isPermittedAny} from 'react-ext/lib/auth/SecurityTags';//TODO: later change it
import {exist} from '../../share/utils/utils'
import Scrollbar from 'react-scrollbars-custom'
const { SubMenu } = Menu;
const { Header, Sider, Content,Footer } = Layout;
import styles from './sideMenu.scss';
import {connect} from "react-redux";
import config from "../../../fconfig";

const getPath=(routs)=>{
    return routs.map((item) =>{

        return(
            /*item.data.navKey ==='/entity/home' ? 'home' :*/item.path /*TODO : item.path*/
        )
    });
};
const getBankItemStyle=(collapsed)=>{

    return(
        { position: 'fixed',
            bottom: 0,
            zIndex: 1,
            height: '48px',
            color: '#fff',
            lineHeight: '48px',
            textAlign: 'center',
            width:collapsed? '80px' :'240px',
            background: '#a97f04',
            cursor: 'pointer',
            webkitTransition: 'all .2s',
            transition:'all .2s',right: 0,
        }
    )

};


class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        const {routs}=this.props;
        const defaultSelect=getPath(routs)
        this.state = {
            openKeys: defaultSelect,
            routs:routs
        };
    }


    static getDerivedStateFromProps(props, state) {

        if (props.routs !== state.routs) {
            const defaultSelect= getPath(props.routs)

           return {
               ...state,
               openKeys: defaultSelect,
               routs: props.routs
           }
        }
        return null;
    }

    handleClick=(rout,menuItem)=>{
        this.props.router.push(rout);
        const openKeys=rout.split('/');

        this.setState({
            openKeys:openKeys
        })
    };

   addMeuItem=(routs)=>{
       let {permissions} = this.props;

       return routs.map((item, index) => {
           if (item!==null){
               if (item.children && (item.permission == undefined || item.permission == [] || (item.permission && isPermittedAny(permissions,item.permission)))){
                   return (
                       <SubMenu
                           key={item.nameEn}
                           //className={item.level===2 ? styles.submenu : ''}
                           className={item.level==2 ? styles.submenu :''}
                           //    style={item.level==2  ? {background:'rgb(17 50 140)',borderRight:'4px solid #00bbf0'}:{}}
                           title={
                               <span style={(item.level && item.level>1)? {paddingRight:'30px'} :{}}>
                                 {item.icon && <Icon type={item.icon} style={{fontSize:'18px'}}/>}
                                   {item.img && <img width={22} alt={'logo'} src={item.img} style={{margin:'6px 4px'}}/>}
                                   <span>{item.nameFa}</span>
                           </span>
                           }
                       >
                           {this.addMeuItem(item.children)}
                       </SubMenu>
                   );
               }else if (item.permission === undefined || item.permission == [] || (item.permission && isPermittedAny(permissions,item.permission))) {
                   return (
                       <Menu.Item key={item.nameEn} onClick={this.handleClick.bind(this, item.key)}
                                  style={item.level==2 ? {paddingRight:'30px'} : { }}
                                  className={item.level==2 ? styles.submenu :
                                      ( item.level==3 && !exist(item.children) ?styles.submenu2:{/*color:'blue'*/})}>
                           {item.icon && <Icon type={item.icon} style={{fontSize:'18px'}}/>}
                           {item.img && <img width={22} alt={'logo'} src={item.img} style={{margin:'6px 4px'}}/>}
                           <span>{item.nameFa}</span>
                       </Menu.Item>
                   )
               }

           }


       });
    };

    handleOnOpenChange=(openKeys)=>{
        this.setState({
            openKeys:openKeys
        })
    };

    render() {
        const {openKeys}=this.state;
        const {collapsed}=this.props;
        return (
            <Sider trigger={null}
                   width={240}
                   collapsible
                   collapsed={collapsed}
                   style={{overflowY:'auto',overflowX:'hidden',position:'fixed'}}
                   theme={'light'}
                   className={'hidden-print'}
            >
                <Scrollbar  style={{ height: '100vh'}}
                >
                    {
                        collapsed ?
                            <Menu  theme="dark"
                                   mode="inline"
                                   selectedKeys={openKeys}
                                   onOpenChange={this.handleOnOpenChange}
                                   style={{padding:'20px 0'}}
                            >
                                {this.addMeuItem(menuItems)}
                                {/*{ config.instance ==='isc' && <Menu.Item key={'selectBanks'}*/}
                                {/*           style={getBankItemStyle(collapsed)}>*/}
                                {/*    <a href={config.ISC_SERVER_URL}>*/}
                                {/*   <Icon type={'bank'} style={{fontSize:'18px'}}/>*/}
                                {/*    <span>{'منوی بانک ها'}</span>*/}
                                {/*    </a>*/}
                                {/*</Menu.Item>}*/}
                            </Menu>
                            :
                            <Menu  theme="dark"
                                   mode="inline"
                                   selectedKeys={openKeys}
                                   openKeys={openKeys}
                                   onOpenChange={this.handleOnOpenChange}
                                   style={{padding:'20px 0',marginBottom:'100px'}}
                            >
                                {this.addMeuItem(menuItems)}
                            </Menu>
                    }
                </Scrollbar>
            </Sider>

        );
    }
}


export default withRouter(SideMenu);
/*const mapStateToProps = (state) => ({
   collapsed: state.toggleMenu.collapsed,
   // showLoader: state.loading.showLoader,
});

export default connect(mapStateToProps)(withRouter(SideMenu));*/
