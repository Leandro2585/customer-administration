import { FindByEmailUserRepository } from '@domain/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { UserEntity } from '@infra/database/entities'

export class PgUserRepository extends PostgresRepository implements FindByEmailUserRepository {
	async findByEmail(input: FindByEmailUserRepository.Input): Promise<FindByEmailUserRepository.Output<UserEntity>> {
		const repository = this.getRepository(UserEntity)
		const user = await repository.findOne({ where: { email: input.email }})
		return { user }
	}
}