import { PgUserRepository } from '@infra/database/repositories'

export const makeUserRepository = (): PgUserRepository => {
	return new PgUserRepository()
}