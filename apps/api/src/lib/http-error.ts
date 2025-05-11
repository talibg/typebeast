export interface HttpErrorInterface extends Error {
    statusCode: number
}

type HttpErrorConstructor = {
    new (message: string, statusCode?: number): HttpErrorInterface
    prototype: HttpErrorInterface
}

export const HttpError: HttpErrorConstructor = (function () {
    function HttpError(this: HttpErrorInterface, message: string, statusCode: number) {
        Error.call(this, message)
        this.name = 'HttpError'
        this.message = message
        this.statusCode = statusCode
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError)
        }
    }
    HttpError.prototype = Object.create(Error.prototype) as HttpErrorInterface
    HttpError.prototype.constructor = HttpError

    return HttpError as unknown as HttpErrorConstructor
})()
