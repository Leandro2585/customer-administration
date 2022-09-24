import { mock, MockProxy } from 'jest-mock-extended'

import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { IncorrectPasswordError, NotFoundError } from '@domain/errors'
import { LoginFeature } from '@domain/features'
import { Encrypter, HashComparer } from '@domain/protocols/cryptography'
import { mockUser } from '@tests/domain/mocks'

describe('login feature', () => {
	let sut: LoginFeature
	let userRepository: MockProxy<FindByEmailUserRepository>
	let hashComparer: MockProxy<HashComparer>
	let encrypter: MockProxy<Encrypter>

	beforeAll(() => {
		userRepository = mock()
		hashComparer = mock()
		encrypter = mock()
		userRepository.findByEmail.mockResolvedValue({ user: mockUser() })
		hashComparer.compare.mockResolvedValue(true)
		encrypter.encrypt.mockResolvedValue({ access_token: 'any_access_token' })
	})

	beforeEach(() => {
		sut = new LoginFeature(userRepository, hashComparer, encrypter)
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
		expect(hashComparer.compare).toHaveBeenCalledTimes(1)
	})

	test('should call Encrypter with correct input', async () => {
		await sut.execute({ email: 'any_mail@mail.com', password: 'any_password' })

		expect(encrypter.encrypt).toHaveBeenCalledWith({ value: 1 })
		expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
	})

	test('should throw IncorrectPasswordError when password provided is incorrect', async () => {
		hashComparer.compare.mockResolvedValueOnce(false)
		const promise = sut.execute({ email: 'non_existent_mail@mail.com', password: 'incorrect_password' })
    
		await expect(promise).rejects.toThrow(new IncorrectPasswordError())
	})
})