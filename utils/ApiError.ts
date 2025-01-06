export interface ApiError {
    code: string
    key: string
    message: string
    validationErrors?: ApiErrorValidation[]
}

export interface ApiErrorValidation {
    message: string
    rule: string
    field: string
}