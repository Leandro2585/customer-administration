import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { Encrypter, HashComparer } from '@domain/protocols/cryptography'
import { NotFoundError } from '@domain/errors'
import { LoginUsecase } from '@domain/usecases'

export class LoginFeature implements LoginUsecase {
	constructor (
    private readonly userRepository: FindByEmailUserRepository, 
    private readonly hashComparer: HashComparer, 
    private readonly encrypter: Encrypter
	) {}

	async execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output> {
		const { user } = await this.userRepository.findByEmail({ email: input.email })
		if(!user) throw new NotFoundError('user')
		const passwordIsCorrect = await this.hashComparer.compare({ value: input.password, hashed: user.password })
		if (passwordIsCorrect) {
			const { access_token } = await this.encrypter.encrypt({ value: user.id })
			return {
				access_token,
				user
			}
		}
	}
}