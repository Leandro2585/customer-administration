import { CreateUserRepository, FindAllUserRepository, FindByEmailUserRepository } from '@domain/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { UserEntity } from '@infra/database/entities'
import { UserModel } from '@domain/models'

export class PgUserRepository extends PostgresRepository implements FindByEmailUserRepository, CreateUserRepository, FindAllUserRepository {
	async create(input: UserModel): Promise<CreateUserRepository.Output> {
		const repository = this.getRepository(UserEntity)
		const user = repository.create(input)
		await repository.save(user)
		return { user }
	}
  
	async findByEmail(input: FindByEmailUserRepository.Input): Promise<FindByEmailUserRepository.Output<UserEntity>> {
		const repository = this.getRepository(UserEntity)
		const user = await repository.findOne({ where: { email: input.email }})
		return { user }
	}

	async findAll({ page }: FindAllUserRepository.Input): Promise<FindAllUserRepository.Output> {
		const limit = 10
		const repository = this.getRepository(UserEntity)
		const results = await repository.find({ skip: (page - 1) * limit, take: limit })
		const totalCount = await repository.count()
		return { results, totalCount }
	}
}