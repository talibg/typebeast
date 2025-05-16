import { UserType } from '../contexts/AuthContext'

export type StoreType = {
    token: string | null
    user: UserType | null
}

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
