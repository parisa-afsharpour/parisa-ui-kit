import FontAwesome from "react-fontawesome";
import React from "react";
import {customScrollTo} from "../../../share/utils/smoothScroll/smoothScroll";

const Fab=()=>{


    return(
        <div className='fab'>
            <a style={{ cursor: 'pointer' }} onClick={()=>{ customScrollTo(0);}}>
                <FontAwesome
                    style={{ color: 'gray' }}
                    size='3x'
                    name='arrow-circle-up '
                />
            </a>
        </div>
    )
};

export default Fab;