import { ObjectLiteral, ObjectType, Repository, DeepPartial } from 'typeorm'

import { PostgresConnection } from '@infra/database/helpers'

export abstract class PostgresRepository<T = any> {
	constructor(private readonly connection: PostgresConnection = PostgresConnection.getInstance()) {}

	getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
		return this.connection.getRepository(entity)
	}
}
