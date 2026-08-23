import * as React from 'react';
import Hover from '../../../../share/hover/Hover';
import Text from '../../../../share/typography/Typography';

import PropTypes from 'prop-types'

ProfileFooterItem.prototype={
    text:PropTypes.string,
    iconName: PropTypes.string,
    onClick: PropTypes.func
}

const inlineStyles = {
    footerItem: {
        display:'inline-block',
        marginTop:0,
        width:120,
        textAlign:'center',
        padding: '5px 0',
        fontSize:10,
        cursor:'pointer',
        border:'1px solid #e6f7ff',
        color:'rgba(0,0,0,.65)',
        background: 'white',
        fontWeight:'bold'
       
    }
};
function ProfileFooterItem(props){
    const { text, onClick } = props;

    return (
        <Hover hoverStyle={{cursor: 'pointer',background:'#f5f5f5'}}>
                <span onClick={onClick} style={inlineStyles.footerItem}>
                    <a style={{margin:0, display:'inline-block',fontSize:'14px', textDecoration:'none'}} children={text}/>
                </span>
       </Hover>
    );
}

export default ProfileFooterItem;