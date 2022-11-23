import React from 'react';
import { PoweroffOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAuth0 } from "@auth0/auth0-react"
import { useIsMobileDevice } from '../hooks';

export const NavBar: React.FC = () => {
    const { user, logout } = useAuth0()
    const { isMobile } = useIsMobileDevice()

    const initLogout = () => logout()

    const items: MenuProps['items'] = [
        {
            label: "Apps",
            key: "apps",
            icon: <AppstoreOutlined />
        },
        {
            label: isMobile ? "" : user?.name,
            key: 'auth',
            icon: <UserOutlined />,
            style: { marginLeft: 'auto' },
            children: [
                {
                    label: 'Logout',
                    key: 'logout',
                    icon: <PoweroffOutlined />,
                    onClick: initLogout
                }
            ]
        }
    ]

    return (
        <>
            <img src="shamba-logo.png" alt="logo" className="logo" />
            <Menu theme="dark" mode="horizontal" items={items} inlineIndent={0} defaultSelectedKeys={["apps"]}/>
        </>
    )
}
