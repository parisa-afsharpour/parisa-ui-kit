import PERMISSIONS from "../../../permissions";
import config from "../../../../platform/fconfig";

// TODO: remove level and use key for find level

export const routs= [
  {
    "key": "/entity/dashboard",
    "nameFa" : "مشاهده اطلاعات مشتری",
    "nameEn" : "dashboard",
    "icon": "dashboard",
    "level":"1",
    "permission":[PERMISSIONS.SHAHYAR_DASHBOARD]
  },
  {
    "key": "/entity/report",
    "nameFa": "گزارش ",
    "nameEn": "report",
    "icon": "file-search",
    "permission": [
        PERMISSIONS.SHAHYAR_REP,
      PERMISSIONS.SHAHYAR_REP_ACCOUNTBILL,
      PERMISSIONS.SHAHYAR_REP_TPPRBEHAVIOR,
      PERMISSIONS.SHAHYAR_REP_BANKBEHAVIOR,
      PERMISSIONS.SHAHYAR_REP_SERVICEBEHAVIOR,
        PERMISSIONS.SHAHYAR_REP_DAILYCHART,
      PERMISSIONS.SHAHYAR_REP_TRANSFERTYPEAllDayChart,
      PERMISSIONS.SHAHYAR_REP_SERVICETOTALAllDayChart],
    "level": "1",
    "children": [
      {
        "key": "/entity/report/bankBehavior",
        "nameEn": "bankBehavior",
        "nameFa": "عملکرد بانک",
        "permission": [PERMISSIONS.SHAHYAR_REP_BANKBEHAVIOR],
        "level": "2"
      },

      {
        "key": "/entity/report/customerBehavior",
        "nameEn": "customerBehavior",
        "nameFa": "عملکرد مشتری",
        "permission": [PERMISSIONS.SHAHYAR_REP_TPPRBEHAVIOR],
        "level": "2"
      },
      {
        "key": "/entity/report/serviceBehavior",
        "nameEn": "serviceBehavior",
        "nameFa": "عملکرد سرویس",
        "permission": [PERMISSIONS.SHAHYAR_REP_SERVICEBEHAVIOR],
        "level": "2"
      },

      {
        "key": "/entity/report/accountBill",
        "nameEn": "accountBill",
        "nameFa": " صورت وضعیت",
        "permission": [PERMISSIONS.SHAHYAR_REP_ACCOUNTBILL],
        "level": "2"
      },
      {
        "key": "/entity/report/chart",
        "nameEn": "chart",
        "nameFa": "گزارش های آماری و تحلیلی",
        "permission": [PERMISSIONS.SHAHYAR_REP_CHART],
        "level": "2"
      },
      {
        "key": "/entity/report/mainDashboard",
        "nameEn": "mainDashboard",
        "nameFa": " نمای کلی عملکرد شاهین",
        "permission": [PERMISSIONS.SHAHYAR_REP_DAILYCHART],
        "level": "2"
      },
      {
        "key": "/entity/report/transferServicesDashboard",
        "nameEn": "transferServicesDashboard",
        "nameFa": " نمای کلی سرویس های انتقال",
        "permission": [PERMISSIONS.SHAHYAR_REP_TRANSFERTYPEAllDayChart],
        "level": "2"
      },
      {
        "key": "/entity/report/servicesDashboard",
        "nameEn": "servicesDashboard",
        "nameFa": "نمای کلی سرویس های پردازش شده",
        "permission": [PERMISSIONS.SHAHYAR_REP_SERVICETOTALAllDayChart],
        "level": "2"
      },
    ]
  },
  {
    "key": "/entity/billing",
    "nameFa": "صورت حساب",
    "nameEn": "billing",
    "icon": "file-search",
    "permission": [
      PERMISSIONS.SHAHYAR_BILLING,
      PERMISSIONS.SHAHYAR_BILLING_INVOICE],
    "level": "1",
    "children": [
     {
        "key": "/entity/billing/invoice",
        "nameEn": "invoice",
        "nameFa": "صدور فاکتور",
        "permission": [PERMISSIONS.SHAHYAR_BILLING_INVOICE],
        "level": "2"
      },
    ]
  },
  {
    "key":"userManagement",
    "nameFa" : "مدیریت کاربر",
    "nameEn" : "userManagement",
    "icon": "user",
    "permission": [PERMISSIONS.SAMAB_ADMIN_USERS_VIEW,PERMISSIONS.SAMAB_ADMIN_GROUPS_ADD,
      PERMISSIONS.SAMAB_ADMIN_ROLES_VIEW,PERMISSIONS.SAMAB_ADMIN_PERMISSIONS_EDIT,PERMISSIONS.SAMAB_DASHBOARD,PERMISSIONS.SAMAB_ADMIN_USERS_ACTIVITYREPORT],
    "level":"1",
    "children": [
      {
        "key": "/entity/userManagement/authorized-users",
        "nameEn": "authorized-users",
        "nameFa": "کاربران",
        "permission": [PERMISSIONS.SAMAB_ADMIN_USERS_VIEW],
        "level":"2",
      },
      {
        "key": "/entity/userManagement/groups",
        "nameEn": "groups",
        "nameFa": "گروه ها",
        "permission": [PERMISSIONS.SAMAB_ADMIN_GROUPS_ADD],
        "level":"2"
      },
      {
        "key": "/entity/userManagement/roles",
        "nameEn": "roles",
        "nameFa": "رل ها",
        permission: [PERMISSIONS.SAMAB_ADMIN_ROLES_VIEW],
        "level":"2"
      },
      {
        "key": "/entity/userManagement/permissions",
        "nameEn": "permissions",
        "nameFa": " مجوزها",
        "permission": [PERMISSIONS.SAMAB_ADMIN_PERMISSIONS_EDIT],
        "level":"2"
      }
    ]
  }

];


