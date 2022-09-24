import { RequiredFieldError } from '@application/errors'
import { AuthenticationController } from '@application/controllers'

import { LoginUsecaseSpy } from '../mocks'
import { Controller } from '@application/protocols'


describe('authentication controller', () => {
	let sut: AuthenticationController
	let loginUsecase: LoginUsecaseSpy

	beforeAll(() => {
		loginUsecase = new LoginUsecaseSpy()
	})

	beforeEach(() => {
		sut = new AuthenticationController(loginUsecase)
	})

	test('should extend controller', () => {
		expect(sut).toBeInstanceOf(Controller)
	})

	test('should return RequiredFieldError when email is not provided', async () => {
		const result = await sut.handle({ email: undefined, password: 'any_password' })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('email')
		})
	})

	test('should return RequiredFieldError when password is not provided', async () => {
		const result = await sut.handle({ email: 'any_mail@mail.com', password: undefined })

		expect(result).toEqual({
			status_code: 400,
			data: new RequiredFieldError('password')
		})
	})

	test('should call load profile usecase with correct input', async () => {
		await sut.handle({
			email: 'any_mail@mail.com',
			password: 'any_password'
		})
    
		expect(loginUsecase.input).toEqual({ 
			email: 'any_mail@mail.com',
			password: 'any_password'
		})
	})
})