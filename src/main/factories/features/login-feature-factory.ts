import { LoginFeature } from '@domain/features'
import { makeUserRepository } from '@main/factories/repositories'
import { makeBCryptAdapter, makeJwtAdapter } from '@main/factories/cryptography'

export const makeLoginFeature = (): LoginFeature => {
	const repository = makeUserRepository()
	const cypherAdapter = makeBCryptAdapter()
	const tokenAdapter = makeJwtAdapter()
	return new LoginFeature(repository, cypherAdapter, tokenAdapter)
}