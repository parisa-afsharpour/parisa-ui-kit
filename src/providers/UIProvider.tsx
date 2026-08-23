// src/providers/UIProvider.tsx
import { ConfigProvider } from "antd"
import { antdTheme } from "../theme/antd-theme"

type UIProviderProps = {
    children: React.ReactNode
}

export const UIProvider = ({ children }: UIProviderProps) => {
    return (
        <ConfigProvider theme={antdTheme}>
            {children}
        </ConfigProvider>
    )
}
