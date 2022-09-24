import { RequiredFieldError } from '@application/errors'
import { success } from '@application/helpers'
import { Controller, HttpResponse } from '@application/protocols'
import { LoginUsecase } from '@domain/usecases'

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