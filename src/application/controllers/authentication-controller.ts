import { RequiredFieldError } from '@application/errors'
import { success } from '@application/helpers'
import { Controller, HttpResponse } from '@application/protocols'
import { LoginUsecase } from '@domain/usecases'
import { UserEntity } from '@infra/database/entities'

export class AuthenticationController extends Controller {
	constructor(private readonly loginUsecase: LoginUsecase) { super() }

	async execute({ email, password }: AuthenticationController.Request): Promise<HttpResponse<AuthenticationController.Response>> {
		const response =await this.loginUsecase.execute({ email, password })
		return success(response)
	}

	validate({ email, password }: AuthenticationController.Request): Error | undefined {
		if(!email) return new RequiredFieldError('email')
		if(!password) return new RequiredFieldError('password')
	}
}

export namespace AuthenticationController {
  export type Request = { email: string, password: string }

  export type Response = {
    user: Omit<UserEntity, 'password'>
    access_token: string
  }
}