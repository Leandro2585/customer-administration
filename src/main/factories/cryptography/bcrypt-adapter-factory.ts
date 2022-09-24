import { BCryptAdapter } from '@infra/cryptography'

export const makeBCryptAdapter = (): BCryptAdapter => {
	return new BCryptAdapter(12)
}