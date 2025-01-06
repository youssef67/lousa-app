export default defineEventHandler(async (event) => {
    const path = event.node.req.url?.replace('/api/', '') || ''
    const config = useRuntimeConfig()
    const externalApiBaseUrl = `${config.apiHost}`
    const url = `${externalApiBaseUrl}/${path}`

    const response = await proxyRequest(event, url, {
        headers: {
            'x-a-k': `${config.apiKey}`
        }
    })

    return response
})

