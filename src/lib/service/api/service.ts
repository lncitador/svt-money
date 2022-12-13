import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from 'src/lib/axios'

type QueryProps = Record<string, unknown>
type Post<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
type ID = string | number

export class ApiService<T = never, R = T> {
    constructor(protected readonly DOMAIN_REF: string) {}

    public async get(queryParams: QueryProps = {}, v = 'v1') {
        const url = mountUrl(this.DOMAIN_REF, queryParams)
        return axiosInstance.get<R[]>(`${v}/${url}`)
    }

    public async getById(
        id: ID,
        queryParams?: QueryProps,
        v?: string
    ): Promise<AxiosResponse<R, any>>
    public async getById(id: ID, v?: string): Promise<AxiosResponse<R, any>>
    public async getById(id: ID, arg1?: QueryProps | string, arg2?: string) {
        let url: string

        if (!arg1) {
            url = `v1/${this.DOMAIN_REF}/${id}`
        } else if (typeof arg1 === 'string') {
            url = `${arg1}/${this.DOMAIN_REF}/${id}`
        } else {
            const params = mountUrl('', arg1)
            url = `${arg2 || 'v1'}/${this.DOMAIN_REF}/${id}${params}`
        }

        return axiosInstance.get<R>(url)
    }

    public async post(data: Post<T>, v?: string): Promise<any>
    public async post(
        data: Post<T>,
        config?: AxiosRequestConfig,
        v?: string
    ): Promise<any>
    public async post(data: Post<T>, arg1?: AxiosRequestConfig | string, arg2?: string) {
        if (!arg1) {
            return axiosInstance.post<Post<T>, R>(`v1/${this.DOMAIN_REF}`, data as T)
        } else if (typeof arg1 === 'string') {
            return axiosInstance.post<Post<T>, R>(`${arg1}/${this.DOMAIN_REF}`, data as T)
        } else {
            return axiosInstance.post<Post<T>, R>(
                `${arg2 || 'v1'}/${this.DOMAIN_REF}`,
                data as T,
                arg1
            )
        }
    }

    public async put(id: ID, data: Partial<T>, v = 'v1') {
        return axiosInstance.put<T, R>(`${v}/${this.DOMAIN_REF}/${id}`, data as T)
    }

    public async patch(id: ID, data: Partial<T>, v = 'v1') {
        return axiosInstance.patch<T, R>(`${v}/${this.DOMAIN_REF}/${id}`, data as T)
    }

    public async delete(id: ID, v = 'v1') {
        return axiosInstance.delete<void>(`${v}/${this.DOMAIN_REF}/${id}`)
    }
}

export const mountUrl = (url: string, record: Record<string, any>) => {
    const arr: Array<string> = []
    const queryParams: Array<string> = []

    Object.entries(record).forEach(([key, value]) => {
        const param = `${key}=${value}`
        arr.push(param)
    })

    for (let index = 0; index < arr.length; index++) {
        if (index === 0) {
            queryParams.push(`?${arr[index]}`)
        } else {
            queryParams.push(arr[index])
        }
    }
    return `${url}` + queryParams.join('&')
}
