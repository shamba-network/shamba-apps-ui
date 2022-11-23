import { useAuth0 } from "@auth0/auth0-react"
import { Button, Col, message, Row } from "antd"
import { useEffect, useState } from "react"

import getClient from '../client/client'
import { AppForm } from "../components"
import { AppList } from "../components"
import { IApp, IAppPayload } from "../models"

const client = getClient()

export const AppsHome: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [Message, MessageContext] = message.useMessage()
    const [apps, setApps] = useState<Array<IApp>>([])
    const [currentObject, setCurrentObject] = useState<IApp>({} as IApp)
    const [formOpen, setFormOpen] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    useEffect(() => {
        const fn = async () => await loadApps()
        fn();
    }, [])

    const loadApps = async () => {
        const token = await getAccessTokenSilently({ audience: process.env.REACT_APP_API_AUDIENCE })
        const fetched = await client.getApps(token)
        setApps(fetched)
        setIsFetching(false)
    }

    const hideAppForm = () => {
        setEditMode(false)
        setCurrentObject({} as IApp)
        setFormOpen(false)
    }

    const showCreateAppForm = () => {
        setCurrentObject({} as IApp)
        setEditMode(false)
        setFormOpen(true)
    }

    const showEditAppForm = (id: string) => {
        const targeted = apps.filter(app => app.id === id)
        setCurrentObject(targeted[0])
        setEditMode(true)
        setFormOpen(true)
    }

    const handleFormError = (message: string) => {
        setLoading(false)
        Message.error(message)
    }

    const handleCreate = async (data: IAppPayload) => {
        setLoading(true)
        const token = await getAccessTokenSilently({ audience: process.env.REACT_APP_API_AUDIENCE })
        const created = await client.createApp(token, data)
        const newApps = [created, ...apps]
        setApps(newApps)
        setLoading(false)
        hideAppForm()
    } 

    const replaceApp = (updatedApp: IApp) => {
        const ix = apps.findIndex(app => app.id === updatedApp.id)
        apps.splice(ix, 1, updatedApp)
    }

    const handleEdit = async (data: IAppPayload) => {
        setLoading(true)
        const token = await getAccessTokenSilently({ audience: process.env.REACT_APP_API_AUDIENCE })
        const updated = await client.updateApp(token, currentObject.id, data)
        replaceApp(updated)
        setLoading(false)
        hideAppForm()
        Message.success("Successful update")
    }

    const handleRegenerate = async (id: string) => {
        const token = await getAccessTokenSilently({ audience: process.env.REACT_APP_API_AUDIENCE })
        const updated = await client.refreshApiKey(token, id)
        replaceApp(updated)
        Message.success("API key regenerated")
    }

    const handleDelete = async (id: string) => {
        const token = await getAccessTokenSilently({ audience: process.env.REACT_APP_API_AUDIENCE })
        await client.deleteApp(token, id)
        const newApps = apps.filter(app => app.id !== id)
        setApps(newApps)
        Message.success("App deleted successfully")
    }

    return (
        <div className="apps-home">
            {MessageContext}

            <Row>
                <Col lg={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }} style={{ padding: "50px 20px" }}>
                    <p>
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#8865ff", borderColor: "#8865ff" }}
                            onClick={showCreateAppForm}
                        >
                            New App
                        </Button>
                    </p>

                    <p>
                        Shamba Apps allow developers to build solutions leveraging Shamba APIs. Each app is assigned an App ID
                        and API Key, the latter is sent as part of every API request to authorize access to Shamba resources.
                    </p>

                    <AppList
                        apps={apps}
                        isFetching={isFetching}
                        onEdit={showEditAppForm}
                        onDelete={handleDelete}
                        onRefresh={handleRegenerate}
                    />
                </Col>

            </Row>

            <AppForm
                open={formOpen}
                loading={loading}
                editMode={editMode}
                app={currentObject}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onCancel={hideAppForm}
                onError={handleFormError}
            />
        </div>
    )
}
