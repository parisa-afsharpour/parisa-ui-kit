import React from 'react';
import PERMISSIONS from './permissions';
import { entityRoute, entityChildren as umEntityChildren, entityIndexRoute, homeIndexRoute, loginRoute, logoutRoute, tempRoute, counterRoute, } from '../user-management/router';
import config from "../platform/fconfig";
import {renderCb} from "./render";

const slashRoute = {
  path: '/',
   /* nameFa: "خانه",*/
  data: {
    permissions:[],
    authc: 'anon',
  }
};
/*
const slashRoute = {
    path: '/',
    nameFa: "خانه",
    /!* nameFa: "خانه",*!/
    data: {
        permissions:[],
        authc: 'anon',
    },
    getComponent: () => (
        System.import('../sina/pages/landing/LandingPage.js').then(module => module.default)
    ),
    /!*getComponent: () => (
        System.import('../acms/pages/acmsHome/AcmsHome').then(module => module.default)
    ),*!/
};
*/



const settingsRoute = {
    path: "settings",
    getComponent: () => (
        System.import('./components/setting/Settings.js').then(module => module.default)
    ),
    data: {
        navKey: '/entity/settings',
        permissions: [PERMISSIONS.SAMAB_SETTINGS_INDEX],
        filter: 'authc',
    },

};




const reportRoute = {
    path: 'report',
    nameFa: "گزارشات",
    data: {
        navKey: '/entity/report',
        permissions: [PERMISSIONS.SHAHIN2_REPORT],
        authc: 'anon',
    }
};

const customerBehavior = {
    path: "customerBehavior",
    nameFa: "عملکرد  مشتری",
    getComponent: () => (
        System.import('../sina/pages/CustomerBehavior').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/customerBehavior',
        permissions: [PERMISSIONS.SHAHYAR_REP_TPPRBEHAVIOR],
        filter: 'authc',
    },
};
const chart = {
    path: "chart",
    nameFa: "گزارش های آماری و تحلیلی",
    getComponent: () => (
        System.import('../sina/pages/Chart').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/chart',
        permissions: [PERMISSIONS.SHAHYAR_REP_CHART],
        filter: 'authc',
    },
};

const mainDashboard = {
    path: "mainDashboard",
    nameFa: "نمای کلی عملکرد شاهین",
    getComponent: () => (
        System.import('../sina/pages/MainDashboard').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/mainDashboard',
        permissions: [PERMISSIONS.SHAHYAR_REP_DAILYCHART],
        filter: 'authc',
    },
};
const transferServicesDashboard = {
    path: "transferServicesDashboard",
    nameFa: "نمای کلی سرویس های انتقال",
    getComponent: () => (
        System.import('../sina/pages/TransferServicesDashboard').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/transferServicesDashboard',
        permissions: [PERMISSIONS.SHAHYAR_REP_TRANSFERTYPEAllDayChart],
        filter: 'authc',
    },
};

const servicesDashboard = {
    path: "servicesDashboard",
    nameFa: "نمای کلی سرویس ها پردازش شده",
    getComponent: () => (
        System.import('../sina/pages/ServicesDashboard').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/servicesDashboard',
        permissions: [PERMISSIONS.SHAHYAR_REP_SERVICETOTALAllDayChart],
        filter: 'authc',
    },
};
const bankBehavior = {
    path: "bankBehavior",
    nameFa: "عملکرد  بانک",
    getComponent: () => (
        System.import('../sina/pages/BankBehavior').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/bankBehavior',
        permissions: [PERMISSIONS.SHAHYAR_REP_BANKBEHAVIOR],
        filter: 'authc',
    },
};
const serviceBehavior = {
    path: "serviceBehavior",
    nameFa: "عملکرد  سرویس",
    getComponent: () => (
        System.import('../sina/pages/ServiceBehavior').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/serviceBehavior',
        permissions: [PERMISSIONS.SHAHYAR_REP_SERVICEBEHAVIOR],
        filter: 'authc',
    },
};

const accountBillRoute = {
    path: "accountBill",
    nameFa: "صورت وضعیت",
    getComponent: () => (
        System.import('../sina/pages/AccountBill').then(module => module.default)
    ),
    data: {
        navKey: '/entity/report/accountBill',
        permissions: [PERMISSIONS.SHAHYAR_REP_ACCOUNTBILL],
        filter: 'authc',
    },
};



const notificationSettingIndexRoute = {
    path: "notification-setting",
    nameFa: "تنظیم مقادیر اعلان",
    data: {
        navKey: '/entity/notification-setting',
        permissions: [PERMISSIONS.SINA_HBD_NOTIFICATION],
        filter: 'authc',
    },
    getComponent: () => (
        System.import('../sina/components/notification/notificationParamSetting/NotificationParamSetting').then(module => module.default)
    ),
};
const notificationIndexRoute = {
    path: "notification",
    nameFa: "اعلان ها",
    data: {
        navKey: '/entity/notification',
        permissions: [PERMISSIONS.SINA_HBD_NOTIFICATION],
        filter: 'authc',
    },
    getComponent: () => (
        System.import('../sina/components/notification/notificationMessages/NotificationMessages').then(module => module.default)
    ),
};

const settingDashboardRoute = {
    path: "setting-dashboard",
    getComponent: () => (
        System.import('../platform/pages/setting/SettingDashboard').then(module => module.default)
    ),
    data: {
        navKey: '/entity/setting-dashboard',
        permissions: [PERMISSIONS.SAMAB_PROFILE_EDITPROFILE],
        filter: 'authc',
    },

};
const totpRoute = {
    path: "totp",
    getComponent: () => (
        System.import('../platform/pages/setting/TOTPAuthenticator').then(module => module.default)
    ),
    data: {
        navKey: '/entity/totp',
        permissions: [PERMISSIONS.SAMAB_PROFILE_EDITPROFILE],
        filter: 'authc',
    },

};
/*__________________________________*/
 const billingRoute = {
    path: 'billing',
    nameFa: "صورت حساب",
    data: {
        navKey: '/entity/billing',
        permissions: [PERMISSIONS.SHAHYAR_BILLING],
        authc: 'anon',
    }
};

const invoiceRoute = {
    path: "invoice",
    getComponent: () => (
        System.import('../sina/pages/billing/IssueInvoicePage').then(module => module.default)
    ),
    data: {
        navKey: '/entity/billing/invoice',
        permissions: [PERMISSIONS.SHAHYAR_BILLING_INVOICE],
        filter: 'authc',
    },

};

slashRoute.children = [entityIndexRoute];

entityIndexRoute.children =  [homeIndexRoute];

reportRoute.children=[accountBillRoute,customerBehavior,bankBehavior,serviceBehavior,chart,mainDashboard,servicesDashboard,transferServicesDashboard]
billingRoute.children=[invoiceRoute]
/* Note: adding authc index route to anon route makes it authc */
entityRoute.children = [
    settingsRoute,
    notificationSettingIndexRoute,notificationIndexRoute,
    settingDashboardRoute,
    totpRoute,
    reportRoute,
    billingRoute,
    ...umEntityChildren,
   /* ...samabEntityChildren*/
];

//makeRouteConfig is used for converting jsx route to js route. not used here.
export const routeConfig = [
  slashRoute,
  tempRoute,
  loginRoute,
  logoutRoute,
  entityRoute,
  counterRoute,

];
