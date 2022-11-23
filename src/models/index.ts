export interface IApp {
    id: string;
    uuid: string;
    name: string;
    description: string;
    mode: string;
    owner_id: string;
    api_key: string;
    created_at: string;
    updated_at: string;
}

export interface IAppPayload {
    name: string;
    description?: string;
    mode: string;
}

