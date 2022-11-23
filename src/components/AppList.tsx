import React from 'react'
import { Collapse, Modal, Input, Spin, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled, SyncOutlined, InfoCircleOutlined, SettingOutlined, CalendarOutlined, SmileOutlined} from '@ant-design/icons';
import { IApp } from '../models'

const { Panel } = Collapse

interface AppListProps {
    apps: Array<IApp>;
    isFetching: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onRefresh: (id: string) => void;
}

export const AppList: React.FC<AppListProps> = ({ apps, onEdit, onDelete, onRefresh, isFetching }) => {

    const confirmDeletion = (appId: string, appName: string) => {
        Modal.confirm({
            title: `Delete the app ${appName}?`,
            icon: <ExclamationCircleFilled />,
            content: 'All applications using this app\'s API key will instantly lose access to Shamba services',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onDelete(appId)
            },
            onCancel() {
                return false
            },
        });
    }

    const confirmReferesh = (appId: string) => {
        Modal.confirm({
            title: "Regenerate API Key?",
            icon: <ExclamationCircleFilled />,
            content: 'All applications using this API key will instantly lose access to Shamba services. Please update the applications with the new API key after regeneration!',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                onRefresh(appId)
            },
            onCancel() {
                return false
            },
        });
    }

    const handleEditButton = (e: React.MouseEvent, appId: string) => {
        e.stopPropagation()
        onEdit(appId)
    }

    const handleDeleteButton = (e: React.MouseEvent, appId: string, appName: string) => {
        e.stopPropagation()
        confirmDeletion(appId, appName)
    }

    const handleRefreshButton = (e: React.MouseEvent, appId: string) => {
        e.stopPropagation()
        confirmReferesh(appId)
    }

    const renderItems = (apps: IApp[]) => {
        return apps.map(app => (
            <Panel
                key={app.id}
                header={<>{app.name} <Tooltip placement='topLeft' title={app.description || "No description"}><InfoCircleOutlined /></Tooltip></>}
                extra={[
                    <EditOutlined key={'edit'} style={{ margin: "0 20px" }} onClick={e => handleEditButton(e, app.id)} />,
                    <DeleteOutlined key={'delete'} style={{ margin: "0 20px" }} onClick={e => handleDeleteButton(e, app.id, app.name)} />
                ]}
            >
                <div >
                    <div style={{ marginBottom: '20px', textTransform: 'capitalize' }}>
                        <p className={app.mode}>
                            <SettingOutlined /> {app.mode} Applicaton
                        </p>
                        <p style={{ color: "green" }}>
                            <CalendarOutlined /> Created on {app.created_at.split('T')[0]}
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <p>App ID</p>
                        <Input disabled size="large" value={app.uuid} />
                    </div>


                    <div style={{ marginBottom: '20px' }}>
                        <p>API Key</p>
                        <Input
                            disabled
                            size="large"
                            addonAfter={<Tooltip title="Regenerate API key"><SyncOutlined onClick={e => handleRefreshButton(e, app.id)} /></Tooltip>}
                            value={app.api_key}
                        />
                    </div>

                </div>

            </Panel>
        ))
    }

    return (
        <>
            {
                isFetching ?
                    <div className='centered'>
                        <Spin size="large" />
                    </div> :
                    <Collapse
                        accordion
                        bordered={false}
                        expandIconPosition="end"
                    >
                        {
                            apps.length > 0 ?
                                renderItems(apps) :
                                <div className="no-data">
                                    <SmileOutlined rotate={180} style={{fontSize: '40px'}}/>
                                    <p style={{marginTop: '15px'}}>Create an app using the button above</p>
                                </div>
                        }
                    </Collapse>
            }
        </>
    )
}
