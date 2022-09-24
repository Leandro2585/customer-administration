import { IBackup } from 'pg-mem'

import { PostgresConnection } from '@infra/database/helpers'
import { PostgresRepository } from '@infra/database/protocols'
import { makeFakeDatabase } from '../helpers/mock-db'
import { PgUserRepository } from '@infra/database/repositories'
import { UserEntity } from '@infra/database/entities'

describe('pg user repository', () => {
	let sut: PgUserRepository
	let connection: PostgresConnection
	let backup: IBackup

	beforeAll(async () => {
		connection = PostgresConnection.getInstance()
		const database = makeFakeDatabase([UserEntity])
		backup = (await database).backup()
	})

	afterAll(async () => {
		connection.disconnect()
	})
  
	beforeEach(() => {
		backup.restore()
		sut = new PgUserRepository()
	})

	test('should extend postgres repository', () => expect(sut).toBeInstanceOf(PostgresRepository))
})