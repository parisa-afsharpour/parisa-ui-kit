import React from "react";
import { Divider as AntDivider} from 'antd';
import PropTypes from "prop-types";


const Divider =(props)=>{



    return(
        <AntDivider orientation={props.orientation}>{props.title}</AntDivider>
    )

}
/*============ type check ======================== */
Divider.propTypes = {
    orientation: PropTypes.string,//left right center
    title: PropTypes.string
}
export default Divider;