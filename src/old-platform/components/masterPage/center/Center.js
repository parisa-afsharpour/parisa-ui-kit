import React from "react";
import { Layout } from 'antd';
import Breadcrumb from './breadCrumb/Breadcrumb'
import Footer from "./footer/Footer";
import styles from './center.scss';
import Fab from "./fab/Fab";

class Center extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {collapsed,routs}=this.props;

        return(
            <Layout  className={(collapsed ? styles.centerWithCollapseMenu : styles.centerWithMenu) +' '+'center'}>
                <div className="content" style={{flex: '1 0 auto' , position:'relative'}}>
                     <Breadcrumb routs={routs} />
                     <div style={{margin:'0 5px'}}>
                         {this.props.children}
                     </div>
                </div>
                <Fab/>
                <Footer/>
            </Layout>
        )
    }
}

export default Center;
