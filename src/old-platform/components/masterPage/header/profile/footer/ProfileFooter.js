import * as React from 'react';
import ProfileFooterItem from './ProfileFooterItem';
import PropTypes from 'prop-types';


class ProfileFooter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {settingIsOpen: false}
    }

    handleSettingClose = () => this.setState({settingIsOpen: false});

    handleSettingOpen = () => {
        this.setState({settingIsOpen: true});
        this.context.router.push('/entity/setting-dashboard')
    };

    render() {
        return (
            <React.Fragment>
                <ProfileFooterItem text={'پروفایل'} iconName={'cogs'} onClick={()=>{this.context.router.push('/entity/profile')}} />
                <ProfileFooterItem text={'تنظیمات'} iconName={'cogs'}
                                   onClick={this.handleSettingOpen}/>
            </React.Fragment>
        );
    }
}

export default ProfileFooter;
ProfileFooter.contextTypes = {
    router: PropTypes.object,
  }
  