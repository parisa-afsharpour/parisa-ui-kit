/**
 * Created by Ma_Gorji on 2019/02/04.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import {Form, FormGroup, ControlLabel, FormControl,Button, Table , Pagination,Breadcrumb,Tooltip ,OverlayTrigger } from 'react-bootstrap'

import Select from 'react-select'
//import {Select} from 'react-ext'
import FontAwesome from 'react-fontawesome';
import { Navbar,  NavDropdown, MenuItem } from 'react-bootstrap';

import { connect } from "react-redux";
import { withRouter } from 'found';
import { HttpError, RedirectException } from 'found';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

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
import * as loginactions from "../../samab/actions/userInfoActions";
import config from "../fconfig";


require('isomorphic-fetch');


class SideMenu extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            permissions: []
        }
    }

    componentWillMount() {
           let dataFromAction;
           let data;
           let that = this;

           let url = `${config.ServerUrl}userinfo`
           let params = {
               url: url
           }
           if (that.props.user == null) {
               dataFromAction = async ()=> {

                   return await   this.props.getUserData (params);
               };
               dataFromAction().then(function (data4) {
                   data = data4;
                   that.setState ({
                                       permissions: data.permissions,

                                   });

               });
           }


       }


    handleSideMenu = (eventKey, event) => {

        event.preventDefault();
        this.props.router.push(eventKey);
    }

    render() {

        let  permissions  = this.props.user == null ? this.state.permissions.map(p => p.name) : this.props.user.permissions.map(p => p.name);
        return (
            <div className="sidebar">




                { this.props.menuType == 'rep-gl' &&

                              <SideNav onToggle={(selected) => {
                                                                 if (selected){
                                                                          document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                                                  } else
                                                                     {
                                                                          //document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                                      }
                                                                     }}
                              >
                                  <SideNav.Toggle />
                                  <SideNav.Nav defaultSelected="home">

                                      {isPermitted(permissions, PERMISSIONS.SAMAB_REP_NominalContradiction) && <NavItem onClick={this.handleSideMenu.bind(this, '/entity/indexGlRep/nominalContradictionRep')}
                                                eventKey="/entity/indexGlRep/nominalContradictionRep">
                                          <NavIcon>
                                              <OverlayTrigger placement="left" overlay={(() => {
                                                  return (<Tooltip id="tooltip">
                                                      گزارش سرفصل های مغایرت سیستمی مانده دار
                                                  </Tooltip>);
                                              })()}>
                                                  <img src="/assets/img/balance.png" height="30px">
                                                  </img>
                                              </OverlayTrigger>
                                          </NavIcon>
                                          <NavText >
                                              <div className="navTextSideBar">
                                              گزارش سرفصل های مغایرت سیستمی مانده دار
                                              </div>
                                          </NavText>
                                      </NavItem>
                                      }

                                      {isPermitted(permissions,PERMISSIONS.SAMAB_REP_NominalINBanks) &&       <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexGlRep/nominalInBanksRep')}
                                                                                                                                                                            eventKey="/entity/indexGlRep/nominalInBanksRep">
                                                                                                                                                                       <NavIcon>
                                                                                                                                                                           <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="right" id="tooltip" >
                                                                                                                                                                               گزارش سرفصل های بانک های عامل شعب
                                                                                                                                                                                                                      </Tooltip>);})()}>
                                                                                                                                                                               <img src="/assets/img/nominalInBanks.png" height="30px">
                                                                                                                                                                               </img>
                                                                                                                                                                           </OverlayTrigger>
                                                                                                                                                                       </NavIcon>
                                                                                                                                                                       <NavText>
                                                                                                                                                                           <div className="navTextSideBar">
                                                                                                                                                                               گزارش سرفصل های بانک های عامل شعب                                                                                     </div>
                                                                                                                                                                       </NavText>
                                                                                                                                                                   </NavItem>

                                                                                                                                                                    }

                                  </SideNav.Nav>
                              </SideNav>

                              }

                { this.props.menuType == 'mon-gl' &&

                                              <SideNav onToggle={(selected) => {
                                                                                 if (selected){
                                                                                          document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                                                                  } else
                                                                                     {
                                                                                          document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                                                      }
                                                                                     }}
                                              >
                                                  <SideNav.Toggle />
                                                  <SideNav.Nav defaultSelected="home">
                                                      {isPermitted(permissions,PERMISSIONS.SAMAB_MON_ClearingGL) &&       <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexGLMon/clearingGLMon')}
                                 eventKey="/entity/cindexGLMon/learingGLMon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="right" id="tooltip" >
                                مانیتورینگ تهاتر فزونی صندوق با کسر صندوق
                                                                           </Tooltip>);})()}>
                                    <img src="/assets/img/money-bag.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText>
                                <div className="navTextSideBar">
                                    مانیتورینگ تهاتر فزونی صندوق با کسر صندوق
                                </div>
                            </NavText>
                        </NavItem>

                         }


                                                      {isPermitted(permissions,PERMISSIONS.SAMAB_MON_FundDeficit) &&
                                                      <NavItem
                                                          onClick={this.handleSideMenu.bind(this, '/entity/indexGLMon/fundDeficitMon')}
                                                          eventKey="/entity/indexGLMon/fundDeficitMon">
                                                          <NavIcon>
                                                              <OverlayTrigger placement="left" overlay={(() => {
                                                                  return (<Tooltip placement="right" id="tooltip">
                                                                      مانیتورینگ بدهکار موقت کسر صندوق تسویه نشده
                                                                  </Tooltip>);
                                                              })()}>
                                                                  <img src="/assets/img/equalizer.png" height="30px">
                                                                  </img>
                                                              </OverlayTrigger>
                                                          </NavIcon>
                                                          <NavText>
                                                              <div className="navTextSideBar">
                                                                  مانیتورینگ بدهکار موقت کسر صندوق تسویه نشده
                                                              </div>
                                                          </NavText>
                                                      </NavItem>
                                                      }

                                                      {isPermitted(permissions,PERMISSIONS.SAMAB_MON_NominalException) &&       <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexGLMon/nominalExceptionMon')}
                                                                                      eventKey="/entity/indexGLMon/nominalExceptionMon">
                                                                                 <NavIcon>
                                                                                     <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="right" id="tooltip" >
                                                                                     مانیتورینگ سرفصل های غیر مجاز شعب
                                                                                                                                </Tooltip>);})()}>
                                                                                         <img src="/assets/img/nominalException.png" height="30px">
                                                                                         </img>
                                                                                     </OverlayTrigger>
                                                                                 </NavIcon>
                                                                                 <NavText>
                                                                                     <div className="navTextSideBar">
                                                                                         مانیتورینگ سرفصل های غیر مجاز شعب                                                                                     </div>
                                                                                 </NavText>
                                                                             </NavItem>

                                                                              }
                                                      {isPermitted(permissions,PERMISSIONS.SAMAB_MON_IllegalNominalBranch) && <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexGLMon/IllegalNominalBranchMon')}
                                                                                                                                       eventKey="/entity/indexGLMon/IllegalNominalBranchMon">
                                                          <NavIcon>
                                                              <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="left" id="tooltip" >
                                                                  مانیتورینگ کارکرد سرفصل‌های غیرمجاز در شعب
                                                              </Tooltip>);})()}>
                                                                  <img src="/assets/img/nominalException.png" height="30px">
                                                                  </img>
                                                              </OverlayTrigger>
                                                          </NavIcon>
                                                          <NavText>
                                                              <div className="navTextSideBar">
                                                                  مانیتورینگ کارکرد سرفصل‌های غیرمجاز در شعب
                                                              </div>
                                                          </NavText>
                                                      </NavItem>  }


                                                      {isPermitted(permissions,PERMISSIONS.SAMAB_MON_NominalInBanks) &&       <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexGLMon/nominalInBanksMon')}
                                                                                                                                      eventKey="/entity/indexGLMon/nominalInBanksMon">
                                                                                                                                 <NavIcon>
                                                                                                                                     <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="right" id="tooltip" >
                                                                                                                                         مانیتورینگ سرفصل های بانک های عامل شعب
                                                                                                                                                                                </Tooltip>);})()}>
                                                                                                                                         <img src="/assets/img/nominalInBanks.png" height="30px">
                                                                                                                                         </img>
                                                                                                                                     </OverlayTrigger>
                                                                                                                                 </NavIcon>
                                                                                                                                 <NavText>
                                                                                                                                     <div className="navTextSideBar">
                                                                                                                                         مانیتورینگ سرفصل های بانک های عامل شعب                                                                                     </div>
                                                                                                                                 </NavText>
                                                                                                                             </NavItem>

                                                                                                                              }


                                                  </SideNav.Nav>
                                              </SideNav>

                                              }

                { this.props.menuType == 'mon-branch' &&
                <SideNav onToggle={(selected) => {
                                              if (selected){
                                                       document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                               } else
                                                  {
                                                       document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                   }
                                                  }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        {
                        <NavItem onClick={this.handleSideMenu.bind(this, '/')}
                                 eventKey="/entity/c04Mon">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{fontSize: '1.75em'}}/>
                            </NavIcon>
                            <NavText>
                                خانه
                            </NavText>
                        </NavItem>
                        }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_MON_C04) && <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexBranchMon/c04Mon')}
                                 eventKey="/entity/indexBranchMon/c04Mon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="left" id="tooltip" >
                                                                                                                   بازبینی اطلاعات مشتری
                                                 </Tooltip>);})()}>
                                    <img src="/assets/img/c04.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText>
                                <div className="navTextSideBar">
                                    مانیتورینگ بازبینی اطلاعات مشتری
                                </div>
                            </NavText>
                        </NavItem>  }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_MON_SatnaPaya) && <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexBranchMon/satnaPayaMon')}
                                                                                              eventKey="/entity/indexBranchMon/satnaPayaMon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip placement="left" id="tooltip" >
                                    مانیتورینگ ساتنا/پایا
                                </Tooltip>);})()}>
                                    <img src="/assets/img/satna-paya.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText>
                                <div className="navTextSideBar">
                                    مانیتورینگ ساتنا/پایا
                                </div>
                            </NavText>
                        </NavItem>  }



                    </SideNav.Nav>
                </SideNav>
                }

                { this.props.menuType == 'mon-facility' &&

                <SideNav onToggle={(selected) => {
                                                  if (selected){
                                                           document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                                   } else
                                                      {
                                                           document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                       }
                                                      }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        {  <NavItem onClick={this.handleSideMenu.bind(this,  '/')} eventKey="/entity/IndexFacilityMon/ltb1Mon">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}/>
                            </NavIcon>
                            <NavText>
                                خانه
                            </NavText>
                        </NavItem>    }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_MON_lTB1) &&   <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/IndexFacilityMon/ltb1Mon')}
                                 eventKey="/entity/ltb1Mon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                                                     سندهای سیستمی
                                                                                                                                                    </Tooltip>);})()}>
                                    <img src="/assets/img/ltb1.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">
                                مانیتورینگ سندهای سیستمی
                            </NavText>
                        </NavItem>  }

                        {isPermitted(permissions,PERMISSIONS.SAMAB_MON_UnUsuallClearing) &&    <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/IndexFacilityMon/unusuallClearMon')}
                                 eventKey="/entity/IndexFacilityMon/unusuallClearMon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                   تسویه های نا متعارف
               </Tooltip>);})()}>
                                    <img src="/assets/img/unusuallclear.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">

                                مانیتورینگ تسویه های نا متعارف
                            </NavText>
                        </NavItem>   }

                        {isPermitted(permissions,PERMISSIONS.SAMAB_MON_IllegalFacilityMon) &&   <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/IndexFacilityMon/illegalFacilityMon')}
                                 eventKey="/entity/IndexFacilityMon/illegalFacilityMon">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                                                       تسهیلات غیر مجاز
                                                                                                                                                       </Tooltip>);})()}>
                                    <img src="/assets/img/illegalFacility.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">

                                مانیتورینگ تسهیلات غیر مجاز
                            </NavText>
                        </NavItem>   }


                    </SideNav.Nav>
                </SideNav>


                }


                { this.props.menuType == 'rep-branch' &&

                <SideNav onToggle={(selected) => {
                                                   if (selected){
                                                            document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                                    } else
                                                       {
                                                            document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                        }
                                                       }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        { <NavItem onClick={this.handleSideMenu.bind(this,  '/')} eventKey="/entity/c04">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}/>
                            </NavIcon>
                            <NavText>
                                خانه
                            </NavText>
                        </NavItem>  }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_REP_C04) &&    <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexBranchRep/c04')} eventKey="/entity/indexBranchRep/c04">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                        بازبینی اطلاعات مشتری
                                                                                                                      </Tooltip>);})()}>
                                    <img src="/assets/img/c04.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">
                                 بازبینی اطلاعات مشتری
                            </NavText>
                        </NavItem>     }
                        {isPermitted(permissions, PERMISSIONS.SAMAB_REP_SatnaPaya) &&
                        <NavItem onClick={this.handleSideMenu.bind(this, '/entity/indexBranchRep/satnaPayaRep')} eventKey="/entity/indexBranchRep/satnaPayaRep">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(() => {return (<Tooltip id="tooltip">گزارش ساتنا/پایا</Tooltip>);})()}>
                                    <img src="/assets/img/satna-paya.png" height="30px" />
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">گزارش ساتنا/پایا</NavText>
                        </NavItem>}



                    </SideNav.Nav>
                </SideNav>

                }


                { this.props.menuType == 'rep-facility' &&


                <SideNav onToggle={(selected) => {
                                                                                       if (selected){
                                                                                                document.getElementById('root-container').classList.replace('contentbar-collapsed', 'contentbar');
                                                                                        } else
                                                                                           {
                                                                                                document.getElementById('root-container').classList.replace('contentbar', 'contentbar-collapsed');
                                                                                            }
                                                                                           }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        {   <NavItem onClick={this.handleSideMenu.bind(this,  '/')} eventKey="/entity/tasviye">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}/>
                            </NavIcon>
                            <NavText>
                                خانه
                            </NavText>
                        </NavItem>  }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_REP_Tasviye) &&   <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexFacilityRep/tasviye')} eventKey="/entity/indexFacilityRep/tasviye">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                        گزارش تسویه
                                                                                                                        </Tooltip>);})()}>
                                    <img src="/assets/img/tasviye.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">
                                گزارش تسویه
                            </NavText>
                        </NavItem>  }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_REP_Tamdid) && <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexFacilityRep/tamdid')} eventKey="/entity/indexFacilityRep/tamdid">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                      گزارش  تمدید
                                                                                                                        </Tooltip>);})()}>
                                    <img src="/assets/img/tamdid.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">
                                گزارش تمدید
                            </NavText>
                        </NavItem>  }
                        {isPermitted(permissions,PERMISSIONS.SAMAB_REP_Vasighe) &&  <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexFacilityRep/vasighe')}
                                 eventKey="/entity/indexFacilityRep/vasighe">
                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                    گزارش اصلاح آزادسازی وثیقه
                                                                                                                      </Tooltip>);})()}>
                                    <img src="/assets/img/vasighe.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>
                            <NavText className="navTextSideBar">
                                گزارش اصلاح / آزاد سازی وثیقه
                            </NavText>
                        </NavItem>  }

                        {isPermitted(permissions,PERMISSIONS.SAMAB_REP_Ltb1) &&    <NavItem onClick={this.handleSideMenu.bind(this,  '/entity/indexFacilityRep/ltb1Report')}
                                 eventKey="/entity/indexFacilityRep/ltb1Report">


                            <NavIcon>
                                <OverlayTrigger placement="left" overlay={(()=>{return(<Tooltip id="tooltip" >
                                                                                                                                گزارش سندهای سیستمی
                                                                                                                               </Tooltip>);})()}>
                                    <img src="/assets/img/ltb1.png" height="30px">
                                    </img>
                                </OverlayTrigger>
                            </NavIcon>

                            <NavText className="navTextSideBar">
                                گزارش سندهای سیستمی
                            </NavText>

                        </NavItem>   }

                    </SideNav.Nav>
                </SideNav>


                }


            </div>



        );
    }






}
const select = (state) => ({
    user: state.userInfo.user,
})


const action = (dispatch) => ({
    getUserData: (params) => {
        console.log ('dispatching getUserData ');
        return dispatch(loginactions.getUserData(params))
    },
    dispatch,
});

export default connect(select, action)(withRouter(SideMenu));



