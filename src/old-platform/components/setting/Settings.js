/**
 * Created by mahdi on 12/17/18.
 */
import React, { Component } from 'react';
import config from '../../fconfig';
import fetch from 'isomorphic-fetch';
import { Loading } from 'react-ext';
import styles from "./setting.scss";
import RaisedButton from '../share/raisedButton/RaisedButton';
import FullPageLoading from '../share/fullPageLoading/fullPageLoading';

export default class Settings extends Component {

    state = {
        message: '',
        loading: false,
    }

    render() {
        return (
            <div className={styles.setting_container}>
                <div>
                    <img src='/assets/img/refresh.svg' />
                    <span>به روز رسانی مجوزها </span>
                    <p>به روز رسانی مجوز ها بر اساس آخرین تغییرات اطلاعات پایه </p>
                    <div></div>
                    <RaisedButton
                        label={this.state.message !== '' ? this.state.message :  '  به روزرسانی ایندکس  '}
                        type="button"
                        disabled={this.state.message !== ''}
                        className={styles.setting_button}
                        onClick={this._onClick}
                    >
                        {this.state.loading && <FullPageLoading />}

                    </RaisedButton>
                </div>
            </div>
        );
    }

    _onClick = (e) => {
        e.preventDefault();
        console.log('onClick ');
        this._fetch();
    }

    _fetch = async () => {
        this.setState({ loading : true});
        let url = `${config.serverContextPath}/api/reindex`;
        let response = await fetch(url, {
            method: 'GET',
            credentials: 'include', //pass cookies, for authentication
        });
        if (response.status == 200) {
            this.setState({ message: 'به روز رسانی ایندکس انجام شد.', loading: false});
        }else {
            this.setState({ message: `${response.status} خطا در به روزرسانی ایندکس `, loading: false, });
        }
    }
}
