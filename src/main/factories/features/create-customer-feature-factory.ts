import { CreateCustomerFeature } from '@domain/features'
import { makeAddressRepository, makeUserRepository } from '@main/factories/repositories'
import { makeBCryptAdapter } from '@main/factories/cryptography'

export const makeCreateCustomerFeature = (): CreateCustomerFeature => {
	const userRepository = makeUserRepository()
	const addressRepository = makeAddressRepository()
	const cypherAdapter = makeBCryptAdapter()
	return new CreateCustomerFeature(userRepository, addressRepository, cypherAdapter)
}