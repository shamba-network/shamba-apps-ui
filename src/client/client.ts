import axios, { Axios } from "axios"
import { IApp, IAppPayload } from "../models"

class APIClient {
    private static _instance: APIClient
    private client: Axios

    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            timeout: Number(process.env.REACT_APP_TIMEOUT_DURATION) || 10000
        })
    }

    static getInstance(): APIClient {
        if (!APIClient._instance) { APIClient._instance = new APIClient() }
        return APIClient._instance
    }

    async getApps(token: string): Promise<IApp[]> {
        const res = await this.client.get<IApp[]>("/apps", { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }

    async createApp(token: string, data: IAppPayload): Promise<IApp> {
        const res = await this.client.post<IApp>("/apps", data, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }

    async updateApp(token: string, id: string, data: IAppPayload): Promise<IApp> {
        const res = await this.client.put<IApp>(`/apps/${id}`, data, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }

    async refreshApiKey(token: string, id: string): Promise<IApp> {
        const res = await this.client.get<IApp>(`/apps/${id}/refresh-key`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }

    async deleteApp(token: string, id: string): Promise<void> {
        const res = await this.client.delete<void>(`/apps/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
        return res.data
    }

}

export default APIClient.getInstance