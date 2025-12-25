import { proxy } from 'valtio'

export const authStore = proxy({
  token: '' as string | null
})

export const setToken = (token: string) => {
  authStore.token = token
}

export const clearToken = () => {
  authStore.token = null
}
