import { UserType } from './AuthContext'

export type StoreType = {
    token: string | null
    user: UserType | null
}

type ResolveFunction = (value: boolean | PromiseLike<boolean>) => void
type RejectFunction = (reason?: unknown) => void

let resolveAuthReadyPromise: ResolveFunction | null = null
let rejectAuthReadyPromise: RejectFunction | null = null

const store: StoreType = {
    token: null,
    user: null,
}

export const storeManager = {
    setStore: ({ token, user }: StoreType) => {
        store.token = token
        store.user = user
    },
    getStore: () => store,
    clearStore: () => {
        store.token = null
        store.user = null
    },
}

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
