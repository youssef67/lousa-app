import type { ApiError } from '~/utils/ApiError'


export class ClientError extends Error {
  public code: string
  public key?: string
  public apiError?: ApiError

  constructor(message: string, code: string, key?: string, apiError?: ApiError) {
    super(message)
    this.name = 'ClientError'
    this.code = code
    this.key = key
    this.apiError = apiError

    Object.setPrototypeOf(this, ClientError.prototype)
  }
}
export const useSpecialError = () => {
  const toast = useSpecialToast()
  const logger = useSpecialLogger()

  const handleError = (error: ClientError) => { 
    if (error.key === 'ERROR_API_MAINTENANCE') {
      showError({
        statusCode: 503,
        statusMessage: error.message
      })
    } else {
      toast.showError(error.message, `code : ${error.code}`)
      logger.e('===> FATAL ERROR', error)
    }
  }

  const newError = (key: string, code: string): ClientError => {
    return new ClientError(key, `C-${code}`, key) // C- is for Client Error
  }

  const newApiError = (error: ApiError): ClientError => {
    let message = error.message
    if (error.validationErrors && error.validationErrors.length > 0) {
      message = error.validationErrors.map(e => e.message).join('\n')
    }

    const finalCode = error.code ?? 'C-499'
    const finalMessage = message ? message : 'An error occurred while processing your request'

    return new ClientError(finalMessage, finalCode, error.key, error)
  }

  const proceedApiError = async (error: any) => {
    logger.e('API ERROR', error)
    if (error.statusCode >= 500) {
      throw newApiError({
        code: `C-${error.statusCode}`,
        message: 'An error occurred while processing your request',
        key: 'ERROR_API_ERROR'
      })
    } else if (error.statusCode < 500) {
      const apiError = (await error.data) as ApiError
      throw newApiError(apiError)
    } else {
      throw newApiError({
        code: 'C-600',
        message: 'Network not available, please try later…',
        key: 'ERROR_API_NO_NETWORK'
      })
    }
  }

  return {
    handleError,
    newError,
    newApiError,
    proceedApiError
  }
}
