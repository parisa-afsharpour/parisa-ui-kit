/**
 * Created by mahdi on 12/17/18.
 */
import React, { Component } from 'react';
import config from '../../fconfig';
import fetch from 'isomorphic-fetch';
import { Loading } from 'react-ext';
import { Button,  FormControl,  } from 'react-bootstrap';
import { translate } from '../../components/errorTranslator';
import { toast } from '../../components/share/utils/common';
import { withRouter } from 'found';
import { isPermitted } from 'react-ext/lib/auth/SecurityTags';
import PERMISSIONS from '../../permissions';
import cookie from "cookie";
import {getFetcher} from "../../../samab/utils/AxiosRestFetcher";
import {findByStringAddress} from "../../components/share/utils/parser";

class Settings extends Component {
  state = {
    message: '',
    loading: false,
    userCode: '',
    userInfo:null
  };

  componentDidMount() {
    let that = this;

    getFetcher(`user/current`,null,this.props.router, findByStringAddress(this.props.location, 'pathname')).then(function (newData) {

      if (newData){
        let data=newData
        that.setState({
          userInfo:data
        })
      }

    });

  }
  componentWillMount() {
    let that = this;

    getFetcher(`user/current`,null,this.props.router, findByStringAddress(this.props.location, 'pathname')).then(function (newData) {

      if (newData){
        let data=newData
        that.setState({
          userInfo:data
        })
      }

    });
  }

  removeSession = async () => {
    let parsedCookies = cookie.parse(document.cookie);
    let that = this;
    let url = `${config.ServerUrl}removeSession/${this.state.userCode}`;

    let response = await fetch(url, {
      credentials: 'include', //pass cookies, for authentication
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN':parsedCookies[config.CSRF_TOKEN]
      },
      body: JSON.stringify({}),
    }).catch((error) => {
      if (error.status == 401) {
        that.props.router.push(
            `/login?callback=${that.props.location.pathname}`
        );
      }
      console.log('exceptionn', error);
      let inf = translate(error);
      toast('error ', inf);
    });
  };

  render() {
    let permissions =
        this.state.userInfo == null
            ? []
            : ! this.state.userInfo.permissions
            ? []
            :  this.state.userInfo.permissions.map((p) => p.name);
    return (
        <div className={'setting-container'}>
          {isPermitted(permissions, PERMISSIONS.SAMAB_SETTINGS_INDEX) && (
              <div>
                <img src='/assets/img/refresh.svg' />
                <span>به روز رسانی مجوزها </span>
                <p>به روز رسانی مجوز ها بر اساس آخرین تغییرات اطلاعات پایه </p>
                <div></div>
                <Button
                    style={{ width: '100%', margin: '35px 0 4px 0',border:'none' , backgroundColor:'rgb(43, 106, 142)' }}
                    bsStyle={'info'}
                    onClick={this._onClick}
                    disabled={this.state.message !== ''}
                >
                  {this.state.message !== '' && this.state.message}
                  {this.state.message === '' && '  به روزرسانی ایندکس  '}
                  {this.state.loading && <Loading />}
                </Button>
              </div>
          )}
          {isPermitted(permissions, PERMISSIONS.SAMAB_SETTINGS_ForceLogOut) && (
              <div>
                <img
                    src='/assets/img/exit.svg'
                    style={{ transform: 'rotate(180deg)', height: '8rem' }}
                />
                <span> خروج اضطراری </span>
                <p>
                  کد کاربر را برای خروج اضطراری به معنی بستن تمام سشن های قبلی کاربر
                  وارد کنید.
                </p>
                <div>
                  <FormControl
                      type='text'
                      placeholder='کد کاربر'
                      value={this.state.userCode}
                      onChange={(val) =>
                          this.setState({ userCode: val.target.value })
                      }
                      style={{ borderRadius: '0 4px 4px 0' }}
                  />
                  <Button
                      style={{ width: '100%', marginTop: '12px',border:'none' , backgroundColor:'rgb(43, 106, 142)' }}
                      bsStyle={'info'}
                      onClick={this.removeSession}
                  >
                    خروج اضطراری
                  </Button>
                </div>
              </div>
          )}
        </div>
    );
  }

  _onClick = (e) => {
    e.preventDefault();
    console.log('onClick ');
    this._fetch();

    //fetch
  };

  _fetch = async () => {
    let parsedCookies = cookie.parse(document.cookie);
    this.setState({ loading: true });
    let url = `${config.serverContextPath}/api/reindex`;
    let response = await fetch(url, {
      method: 'GET',
      credentials: 'include', //pass cookies, for authentication
      'X-XSRF-TOKEN':parsedCookies[config.CSRF_TOKEN]
    });

    if (response.status == 200) {
      this.setState({
        message: 'به روز رسانی ایندکس انجام شد.',
        loading: false,
      });
    } else {
      this.setState({
        message: `${response.status} خطا در به روزرسانی ایندکس `,
        loading: false,
      });
    }
  };
}


export default withRouter(Settings);
