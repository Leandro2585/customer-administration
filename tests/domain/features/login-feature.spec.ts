import { mock, MockProxy } from 'jest-mock-extended'

import { LoginFeature } from '@domain/features'
import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { mockUser } from '@tests/domain/mocks'

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
})