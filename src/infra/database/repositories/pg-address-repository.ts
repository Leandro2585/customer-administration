import { CreateAddressRepository } from '@domain/protocols/repositories'
import { PostgresRepository } from '@infra/database/protocols'
import { AddressEntity } from '@infra/database/entities'
import { AddressModel } from '@domain/models'

export class PgAddressRepository extends PostgresRepository implements CreateAddressRepository {
	async create(input: AddressModel): Promise<CreateAddressRepository.Output> {
		const repository = this.getRepository(AddressEntity)
		const address = repository.create(input)
		await repository.save(address)
		return { address }
	}
}