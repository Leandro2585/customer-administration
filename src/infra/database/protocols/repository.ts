import { ObjectLiteral, ObjectType, Repository, DeepPartial } from 'typeorm'

import { PostgresConnection } from '@infra/database/helpers'

export abstract class PostgresRepository {
	constructor(private readonly connection: PostgresConnection = PostgresConnection.getInstance()) {}

	getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
		return this.connection.getRepository(entity)
	}

	async create<Entity extends ObjectLiteral, Input extends DeepPartial<Entity>[]>(entity: ObjectType<Entity>, input: Input): Promise<Entity> {
		const repository = await this.getRepository(entity)
		const created_data = await repository.create(input)
		await repository.save(created_data)
		return created_data[0]
	}
}
