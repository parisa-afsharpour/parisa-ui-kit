import * as React from 'react';
import Text from '../../../../share/typography/Typography';
import UserAvatar from './UserAvatar';

const inlineStyles= {
    wrapper: {
        padding: 10,textAlign: 'center',
        background:'#fff',
        color:'#fff'
    },
    userInfo:{
        fontSize:16, margin:'10px auto 0 auto'
    },
    name: { fontSize:14 ,fontWeight:'bold'},
};

class ProfileBody extends React.Component{
  render(){
      const {principal}=this.props;

      const userName= (principal.firstName && principal.lastName) ? principal.firstName +' '+ principal.lastName : principal.login

      return (
          <div style={inlineStyles.wrapper}>
              <UserAvatar avatarUrl={principal.login}/>
              <Text children={userName} style={inlineStyles.name}/>
          </div>
      );
  }
}

export default ProfileBody;