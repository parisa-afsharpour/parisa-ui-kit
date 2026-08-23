// src/theme/antd-theme.ts


import type { ThemeConfig } from 'antd';

import type { UITheme } from './theme';

export const createAntdTheme = (
    theme: UITheme
): ThemeConfig => {

    return {
        token: {
            colorPrimary:
            theme.colors.primary,

            colorError:
            theme.colors.error,

            colorSuccess:
            theme.colors.success,

            colorWarning:
            theme.colors.warning,

            colorText:
            theme.colors.text,

            colorTextSecondary:
            theme.colors.textSecondary,

            colorTextDisabled:
            theme.colors.textDisabled,

            colorBorder:
            theme.colors.border,

            colorBgContainer:
            theme.colors.background,

            colorBgContainerDisabled:
            theme.colors.backgroundDisabled,

            borderRadius:
                Number(
                    theme.radius.medium
                        .replace('px', '')//بهتره بعداً این را تمیز کنیم و Radius را طوری طراحی کنیم که هم CSS و هم AntD بتوانند از آن استفاده کنند.
                ),

            fontFamily:
            theme.typography.fontFamily.sans,
        },
    };
};


// import type { ThemeConfig } from "antd"
//
// export const antdTheme: ThemeConfig = {
//     token: {
//         colorPrimary: "#4f46e5",
//         borderRadius: 10,
//         fontFamily: "Inter, system-ui, sans-serif",
//     },
// }
