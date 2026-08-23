import React from "react";
import {Breadcrumb as AntBreadCrumb, Icon, Menu} from 'antd'
import {withRouter} from "found";
import {exist} from "../../../share/utils/utils";
import CollapseBox from "../../../share/CollapseBox/CollapseBox";

class Breadcrumb extends React.Component{

    loadItem=(routs)=>{
        return routs.map((item, index) => {
                return (
                    <AntBreadCrumb.Item key={index}>
                        {item.nameFa}
                    </AntBreadCrumb.Item>
                );
        });
    };


    render(){
        const {routs}= this.props;
        return(
            <AntBreadCrumb style={{ margin: '5px 7px' }}  className={'hidden-print'}>
                {(Array.isArray(routs) && routs.length>2) && this.loadItem(routs)}{/*TODO: improve*/}
            </AntBreadCrumb>
        )
    }

}

export default Breadcrumb;