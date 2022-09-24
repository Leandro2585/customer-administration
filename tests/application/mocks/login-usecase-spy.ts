import { LoginUsecase } from '@domain/usecases'
import { mockUser } from '@tests/domain/mocks'

export class LoginUsecaseSpy implements LoginUsecase {
	input?: LoginUsecase.Input
	output: LoginUsecase.Output = {
		access_token: 'any_access_token',
		user: mockUser()
	}
	async execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
		await Promise.resolve(null)
		this.input = input
		return this.output
	}
}