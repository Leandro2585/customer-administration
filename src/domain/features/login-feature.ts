import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { LoginUsecase } from '@domain/usecases'

export class LoginFeature implements LoginUsecase {
	constructor (private readonly userRepository: FindByEmailUserRepository) {}

	async execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
		await this.userRepository.findByEmail({ email: input.email })
		return
	}
}