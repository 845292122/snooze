import { proxy } from 'valtio'

type PreferenceType = {
  collapse: boolean
}

export const preferenceState = proxy<PreferenceType>({
  collapse: false
})
