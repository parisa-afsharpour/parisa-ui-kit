import * as React from "react";
import {Layout, Tooltip} from "antd";

import config from "../../../../fconfig";

const styles= {
    container: {
        backgroundColor: 'grey',
        height: 50,
        padding: "0 10px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid grey",
    },
    textStyles: {
        float: "left",
        whiteSpace: "nowrap",
        fontSize: 11,
        lineHeight: "50px",
        margin: "5px 10px -5px",
        color: "red",
        unicodeBidi: "plaintext",
        fontFamily: "IRANSans",
        display: "flex",
    },
    strongStyles: {
        color: 'grey',
        fontWeight: "bold",
        padding: "0 4px",
    },
    image: {
        width: 38,
        height: 38,
    },
    clock: {
        position: "absolute",
        left: 50,
        bottom: 10,
        margin: 5,
        zIndex: 9999,
        direction: "rtl",
    },
    logo: {
        width: 36,
        height: 36,
    },
};


class Footer extends React.Component{

    render() {
        const version = (<span>
                <p>frontend: {process.env.VERSION}</p>
                <p>backend: {config.BACKEND_VERSION}</p>
            </span>);
        return (
            <Layout.Footer style={{flexShrink: 0}}  className={'hidden-print'}>
                <img src='/assets/img/business/isc-footer-logo.png' style={{width:'164px',marginLeft:'5px'}}/>
                <span>| تمامی حقوق مادی و معنوی این سامانه متعلق به  <a href="https://www.isc.co.ir/">شرکت خدمات انفورماتیک</a> می باشد.</span>
                <Tooltip title={version} placement="right">
                    <span style={{float:'left',marginTop:'6px'}}>نسخه:{config.APPLICATION_VERSION}</span>
                </Tooltip>
            </Layout.Footer>
        );
    }
}

export default Footer;
