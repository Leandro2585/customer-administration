import { mock, MockProxy } from 'jest-mock-extended'

import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { LoginFeature } from '@domain/features'
import { mockUser } from '@tests/domain/mocks'
import { NotFoundError } from '@domain/errors'

describe('login feature', () => {
	let sut: LoginFeature
	let userRepository: MockProxy<FindByEmailUserRepository>

	beforeAll(() => {
		userRepository = mock()
		userRepository.findByEmail.mockResolvedValue({ user: mockUser() })
	})

	beforeEach(() => {
		sut = new LoginFeature(userRepository)
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
})