import { PgAddressRepository } from '@infra/database/repositories'

export const makeAddressRepository = (): PgAddressRepository => {
	return new PgAddressRepository()
}