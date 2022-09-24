import { JWTAdapter } from '@infra/cryptography'
import env from '@main/configs/env'

export const makeJwtAdapter = (): JWTAdapter => {
	return new JWTAdapter(env.TOKEN_SECRET)
}