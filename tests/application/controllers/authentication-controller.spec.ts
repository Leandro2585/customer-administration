import { RequiredFieldError } from '@application/errors'
import { badRequest, success } from '@application/helpers'
import { Controller, HttpResponse } from '@application/protocols'
import { LoginUsecase } from '@domain/usecases'
import { LoginUsecaseSpy } from '../mocks'

export class AuthenticationController extends Controller {
	constructor(private readonly loginUsecase: LoginUsecase) { super() }

	async execute({ email, password }: AuthenticationController.Request): Promise<HttpResponse<AuthenticationController.Response>> {
		await this.loginUsecase.execute({ email, password })
		return success(null)
	}

	validate({ email, password }: AuthenticationController.Request): Error | undefined {
		if(!email) return new RequiredFieldError('email')
		if(!password) return new RequiredFieldError('password')
	}
}

export namespace AuthenticationController {
  export type Request = { email: string, password: string }

  export type Response = any
}

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