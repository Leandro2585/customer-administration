import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { PostgresConnection } from '@infra/database/helpers'
import { PostgresRepository } from '@infra/database/protocols'
import { makeFakeDatabase } from '../helpers/mock-db'
import { PgUserRepository } from '@infra/database/repositories'
import { UserEntity } from '@infra/database/entities'
import { mockUser, mockUserEntity } from '@tests/domain/mocks'

describe('pg user repository', () => {
	let sut: PgUserRepository
	let pgUserRepository: Repository<UserEntity>
	let connection: PostgresConnection
	let backup: IBackup

	beforeAll(async () => {
		connection = PostgresConnection.getInstance()
		const database = makeFakeDatabase([UserEntity])
		backup = (await database).backup()
		pgUserRepository = connection.getRepository(UserEntity)
	})

	afterAll(async () => {
		connection.disconnect()
	})
  
	beforeEach(() => {
		backup.restore()
		sut = new PgUserRepository()
	})

	test('should extend postgres repository', () => expect(sut).toBeInstanceOf(PostgresRepository))

	describe('findByEmail()', () => {
		test('should return user with the same email provided', async ()  => {
			await pgUserRepository.save(mockUserEntity())
			const result = await sut.findByEmail({ email: 'any_mail@mail.com' })
      
			expect(result).toMatchObject({
				user: mockUserEntity()
			})
		})
	})
})