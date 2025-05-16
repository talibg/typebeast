type ResolveFunction = (value: boolean | PromiseLike<boolean>) => void
type RejectFunction = (reason?: unknown) => void

let resolveAuthReadyPromise: ResolveFunction | null = null
let rejectAuthReadyPromise: RejectFunction | null = null

export const authReadyPromise: Promise<boolean> = new Promise<boolean>(
    (resolve, reject) => {
        resolveAuthReadyPromise = resolve
        rejectAuthReadyPromise = reject
    },
)

export const signalAuthReady = (success: boolean): void => {
    if (resolveAuthReadyPromise) {
        resolveAuthReadyPromise(success)
        resolveAuthReadyPromise = null
        rejectAuthReadyPromise = null
    } else {
        console.warn(
            `Auth Ready Promise: signalAuthReady called after promise was already settled.`,
        )
    }
}

export const signalAuthFailure = (error?: unknown): void => {
    if (rejectAuthReadyPromise) {
        console.error(`Auth Ready Promise: Signalling failure`, error)
        rejectAuthReadyPromise(error)

        resolveAuthReadyPromise = null
        rejectAuthReadyPromise = null
    } else {
        console.warn(
            `Auth Ready Promise: signalAuthFailure called after promise was already settled.`,
        )
    }
}
