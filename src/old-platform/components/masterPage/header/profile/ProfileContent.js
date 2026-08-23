import * as React from 'react';
import ProfileBody from './body/ProfileBody';
import ProfileFooter from './footer/ProfileFooter';

const inlineStyles = {
    wrapper: {
        margin: '-4px -16px',
    }
};

function ProfileContent(props){
    return (
        <div style={inlineStyles.wrapper}>
            <ProfileBody principal={props.principal}/>
            <ProfileFooter/>
        </div>)
}

export default ProfileContent;