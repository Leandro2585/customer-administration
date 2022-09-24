import { mock, MockProxy } from 'jest-mock-extended'

import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { NotFoundError } from '@domain/errors'
import { LoginFeature } from '@domain/features'
import { HashComparer } from '@domain/protocols/cryptography'
import { mockUser } from '@tests/domain/mocks'

describe('login feature', () => {
	let sut: LoginFeature
	let userRepository: MockProxy<FindByEmailUserRepository>
	let hashComparer: MockProxy<HashComparer>

	beforeAll(() => {
		userRepository = mock()
		hashComparer = mock()
		userRepository.findByEmail.mockResolvedValue({ user: mockUser() })
		hashComparer.compare.mockResolvedValue(true)
	})

	beforeEach(() => {
		sut = new LoginFeature(userRepository, hashComparer)
	})

	test('should call FindByEmailUserRepository with correct input', async () => {
		await sut.execute({ email: 'any_mail@mail.com', password: 'any_password' })
    
		expect(userRepository.findByEmail).toHaveBeenCalledWith({ email: 'any_mail@mail.com' })
		expect(userRepository.findByEmail).toHaveBeenCalledTimes(1)
	})

	test('should throw NotFoundError when user does not exists', async () => {
		userRepository.findByEmail.mockResolvedValueOnce({ user: undefined })
		const promise = sut.execute({ email: 'non_existent_mail@mail.com', password: 'any_password' })
    
		await expect(promise).rejects.toThrow(new NotFoundError('user'))
	})

	test('should call HashComparer with correct input', async () => {
		await sut.execute({ email: 'any_mail@mail.com', password: 'any_password' })

		expect(hashComparer.compare).toHaveBeenCalledWith({ value: 'any_password', hashed: 'hashed_password' })
	})
})