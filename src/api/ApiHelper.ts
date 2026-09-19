import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
    private readonly request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    async get(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseUrl}${endpoint}`, { headers });
        return { status: response.status(), body: await response.json() };
    }

    async post(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseUrl}${endpoint}`, { data, headers });
        return { status: response.status(), body: await response.json() };
    }

    async put(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseUrl}${endpoint}`, { data, headers });
        return { status: response.status(), body: await response.json() };
    }

    async delete(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseUrl}${endpoint}`, { headers });
        return { status: response.status()};
    }
}