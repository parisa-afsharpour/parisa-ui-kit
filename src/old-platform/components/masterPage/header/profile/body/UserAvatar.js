import * as React from 'react';
import PropTypes from 'prop-types'
import Identicon from "../../../../identicon/Identicon";

const inlineStyles = {
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90,
        margin: 'auto',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.22)',
        textAlign:'center',
        background:'#fff',

    },
};

UserAvatar.propTypes = {
    avatarUrl: PropTypes.string
};
const defaultAvatarUrl = "('/assets/img/bsi/logo.png')";//TODO: user image


function UserAvatar(props) {
    let {avatarUrl} = props;
    if(!avatarUrl){
        avatarUrl = defaultAvatarUrl;
    }

    return (<div style={{
        ...inlineStyles.avatar}}>
        <Identicon id={defaultAvatarUrl} size={'85'} style={{borderRadius:'50%'}}/>
    </div>);
}

export default UserAvatar;