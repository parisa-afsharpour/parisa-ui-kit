import React, {useCallback, useEffect, useState} from "react";
import Tabs from "../../components/share/tabs/Tabs";
import Settings from "./Settings";
import TotpAuthenticator from "./TOTPAuthenticator";
import {getFetcher} from "../../../samab/utils/AxiosRestFetcher";
import {findByStringAddress} from "../../components/share/utils/parser";
import PERMISSIONS from "../../permissions";
import {isPermittedAny} from "react-ext/lib/auth/SecurityTags";


const SettingDashboard = (props) => {
    const [totpEnabled,setTotpEnabled]=useState(true)
    const [permission, setPermission] = useState([]);

    useEffect(() => {
        getFetcher(`/profile/totp-settings`,null,props.router, findByStringAddress(props.location, 'pathname')).then(function (newData) {
            if (newData){
               setTotpEnabled(newData.totpEnabled)
            }
        });
    },[])
    useEffect(() => {
        fetchPermission()
    },[fetchPermission]);

    const fetchPermission = useCallback(async () => {
        await getFetcher(`user/current`,null,props.router, findByStringAddress(props.location, 'pathname')).then(function (newData) {
            if (newData){
                let data=newData
                const permission=data.permissions.map(i=>i.name)
                setPermission(permission)
            }

        });
    },[]);

    let PermissionTotp=(permission && permission.length>0 && (isPermittedAny(permission,[PERMISSIONS.SAMAB_PROFILE_EDITPROFILE])))
    let PermissionIndex=(permission && permission.length>0 && (isPermittedAny(permission,[PERMISSIONS.SAMAB_SETTINGS_INDEX])))

    const tabs = [

        {
            key: 'setting',
            label: 'تنظیمات کاربری',
            invisible:PermissionIndex?false:true,
            component: <Settings/>
        },
        {
            key: 'totp',
            label: 'رمز یکبارمصرف',
            invisible:PermissionTotp && totpEnabled?false:true,
            component: <TotpAuthenticator/>,
        }

    ];

    return (
        <React.Fragment>
            <div className={'rtl'}>
                        <Tabs tabs={tabs}/>

            </div>
        </React.Fragment>
    )
};

export default SettingDashboard;