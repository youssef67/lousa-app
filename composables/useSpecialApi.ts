export type FetchOptions = {
    method: FetchMethod
    body?: any
    headers?: any
    cache: RequestCache
}

export enum FetchMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export const useSpecialApi = () => { 
    const fetch = async (url: string, options: FetchOptions) => {
        const result = await $fetch(url, {
            method: options.method,
            body: options.body,
            headers: options.headers,
            cache: options.cache
        })

        return result
    }

    return {
        fetch
    }
}