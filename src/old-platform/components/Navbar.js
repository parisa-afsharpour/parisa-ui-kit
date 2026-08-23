import React, {Component} from 'react';
import Link from 'found/lib/Link';
import withRouter from 'found/lib/withRouter';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AutoAffix from 'react-overlays/lib/AutoAffix';
//import config from '../../config';
import config from '../fconfig';
import get from 'lodash.get';
import {
    Guest,
    User,
    isPermitted,
    isPermittedAll,
    isPermittedAny,
    HasPermission,
    LacksPermission,
    Authenticated,
    NotAuthenticated,
} from 'react-ext/lib/auth/SecurityTags';

import PERMISSIONS from '../permissions';

const propTypes = {
    //match: matchShape.isRequired,
    //router: routerShape.isRequired,
};


class NavigationBar extends Component {

    _getLoggedInName = (principal) => {
        if (get(principal, 'firstName') != null && get(principal, 'lastName') != null) {
            return `${get(principal, 'firstName')} ${get(principal, 'lastName')}`;
        } else {
            return `${get(principal, 'login')}`
        }

    }

    _handleSelect = (eventKey, event) => {
        this.props.router.push(eventKey);
    }

    render() {
        let {permissions} = this.props;

        return (
            <Navbar inverse collapseOnSelect fixedTop fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/entity">
          <img style={{ paddingTop: '9px', width: '40px', }}  className="navbar-logo" src={config.logo}/>
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav activeKey={this.props.activeNavKey}>

                        {isPermitted(permissions, PERMISSIONS.SAMAB_HOME) &&
                        <NavItem eventKey="/entity/home" onSelect={this._handleSelect}> <i
                            className="fa fa-home fa-fw"></i> صفحه نخست</NavItem>}


                        {isPermittedAny(permissions, [PERMISSIONS.SAMAB_MON_NominalInBanks, PERMISSIONS.SAMAB_MON_ClearingGL, PERMISSIONS.SAMAB_MON_NominalException,
                            PERMISSIONS.SAMAB_MON_FundDeficit, PERMISSIONS.SAMAB_MON_NominalInBanks, PERMISSIONS.SAMAB_MON_lTB1, PERMISSIONS.SAMAB_MON_UnUsuallClearing, PERMISSIONS.SAMAB_MON_IllegalFacilityMon
                        ]) &&
                        <Nav pullLeft>
                            <NavDropdown className="basic-nav-dropdaown navbar-nav" eventKey={5} id="basic-nav-dropdown"
                                         title="مانیتورینگ">



                                    {isPermittedAny(permissions, [PERMISSIONS.SAMAB_MON_NominalInBanks, PERMISSIONS.SAMAB_MON_NominalException, PERMISSIONS.SAMAB_MON_ClearingGL,
                                        PERMISSIONS.SAMAB_MON_FundDeficit,]) &&
                                    <MenuItem eventKey="/entity/indexGLMon" onSelect={this._handleSelect}>

                                        دفتر کل

                                    </MenuItem>}

                                    {isPermittedAny(permissions, [PERMISSIONS.SAMAB_MON_C04]) &&
                                    <MenuItem eventKey="/entity/indexBranchMon" onSelect={this._handleSelect}>

                                        شعبه

                                    </MenuItem>}


                                    {isPermittedAny(permissions, [PERMISSIONS.SAMAB_MON_IllegalFacilityMon, PERMISSIONS.SAMAB_MON_lTB1, PERMISSIONS.SAMAB_MON_UnUsuallClearing]) &&
                                    <MenuItem eventKey="/entity/indexFacilityMon" onSelect={this._handleSelect}>

                                        تسهیلات

                                    </MenuItem>}


                                </NavDropdown>


                              </Nav>
                                  }
                                {isPermittedAny(permissions, [PERMISSIONS.SAMAB_REP_CARDTRANSACTIONS, PERMISSIONS.SAMAB_REP_NominalContradiction, PERMISSIONS.SAMAB_REP_NominalINBanks
                                    , PERMISSIONS.SAMAB_REP_C04, PERMISSIONS.SAMAB_REP_Ltb1, PERMISSIONS.SAMAB_REP_Tamdid, PERMISSIONS.SAMAB_REP_Tasviye, PERMISSIONS.SAMAB_REP_Vasighe]) &&
                                <Nav pullLeft>
                                    <NavDropdown className="basic-nav-dropdaown navbar-nav" eventKey={5}
                                                 id="basic-nav-dropdown"
                                                 title="گزارشات">
                                        {isPermittedAny(permissions, [PERMISSIONS.SAMAB_REP_NominalContradiction, PERMISSIONS.SAMAB_REP_NominalINBanks]) &&
                                        <MenuItem eventKey="/entity/indexGlRep" onSelect={this._handleSelect}> دفتر
                                            کل </MenuItem>}

                                        {isPermitted(permissions, PERMISSIONS.SAMAB_REP_C04) &&
                                        <MenuItem eventKey="/entity/indexBranchRep" onSelect={this._handleSelect}>

                                            شعبه

                                        </MenuItem>}

                                        {isPermittedAny(permissions, [PERMISSIONS.SAMAB_REP_Ltb1, PERMISSIONS.SAMAB_REP_Tamdid, PERMISSIONS.SAMAB_REP_Tasviye, PERMISSIONS.SAMAB_REP_Vasighe]) &&
                                        <MenuItem eventKey="/entity/indexFacilityRep"
                                                  onSelect={this._handleSelect}> تسهیلات </MenuItem>}

                                    </NavDropdown>
                                </Nav>
                                }

                                  {isPermittedAny(permissions, [PERMISSIONS.SAMAB_ADMIN_USERS_VIEW, PERMISSIONS.SAMAB_ADMIN_ROLES_VIEW, PERMISSIONS.SAMAB_ADMIN_GROUPS_VIEW, PERMISSIONS.SAMAB_ADMIN_PERMISSIONS_VIEW, PERMISSIONS.SAMAB_ADMIN_USERS_ACTIVITYREPORT, PERMISSIONS.SAMAB_ADMIN_USERS_SESSION_REPORT]) &&
                                  <Nav pullLeft>
                                      <NavDropdown className="basic-nav-dropdaown navbar-nav" eventKey={5}
                                                   id="basic-nav-dropdown"
                                                   title="مدیریت کاربر">
                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_USERS_VIEW) &&
                                          <MenuItem eventKey="/entity/authorized-users" onSelect={this._handleSelect}>
                                              <i
                                                  className="fa fa-user fa-fw"></i> کاربران </MenuItem>}

                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_ROLES_VIEW) &&
                                          <MenuItem eventKey="/entity/groups" onSelect={this._handleSelect}> <i
                                              className="fa fa-globe fa-fw"></i> گروه ها </MenuItem>}

                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_GROUPS_VIEW) &&
                                          <MenuItem eventKey="/entity/roles" onSelect={this._handleSelect}> <i
                                              className="fa fa-clipboard fa-fw"></i> رل ها </MenuItem>}

                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_PERMISSIONS_VIEW) &&
                                          <MenuItem eventKey="/entity/permissions" onSelect={this._handleSelect}> <i
                                              className="fa fa-globe fa-fw"></i> مجوزها </MenuItem>}

                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_USERS_ACTIVITYREPORT) &&
                                          <MenuItem eventKey="/entity/report" onSelect={this._handleSelect}> <i
                                              className="fa fa-clipboard fa-fw"></i> گزارش فعالیت کاربر</MenuItem>}

                                          {isPermitted(permissions, PERMISSIONS.SAMAB_ADMIN_USERS_SESSION_REPORT) &&
                                          <MenuItem eventKey="/entity/session-report" onSelect={this._handleSelect}> <i
                                              className="fa fa-clipboard fa-fw"></i> گزارش حضور کاربر</MenuItem>}


                                      </NavDropdown>
                                  </Nav>

                                  }



</Nav>

                            <Nav pullRight >
                            <NavDropdown eventKey={5} title={this.props.authenticated && this.props.principal ? this._getLoggedInName(this.props.principal) : 'کاربر مهمان'} id="basic-nav-dropdown">

                            {isPermitted(permissions, PERMISSIONS.SAMAB_PROFILE_EDITPROFILE) &&
                            <MenuItem
                                eventKey="/entity/profile"
                                onSelect={this._handleSelect}>

                                <span><FontAwesome name='user'/></span> پروفایل</MenuItem>
                            }

                            {isPermitted(permissions, PERMISSIONS.SAMAB_SETTINGS_INDEX) &&
                            <MenuItem
                                eventKey="/entity/settings"
                                onSelect={this._handleSelect}>

                                <span><FontAwesome name='cog'/></span> تنظیمات</MenuItem>
                            }
                            <MenuItem divider />

                            {this.props.authenticated &&
                            <MenuItem
                                eventKey="/logout"
                                onSelect={this._handleSelect}>

                                <span><FontAwesome name='sign-out'/></span> خروج</MenuItem>
                            }

                            {!this.props.authenticated &&
                            <MenuItem
                                eventKey="/login"
                                onSelect={this._handleSelect}
                            >
                                <span><FontAwesome name='sign-in'/></span> ورود</MenuItem>}

                            </NavDropdown>
                            </Nav>
                            </Navbar.Collapse>
                            </Navbar>
                            );
                        }

                        }

                        NavigationBar.propTypes = propTypes;
                        export default withRouter(NavigationBar);
