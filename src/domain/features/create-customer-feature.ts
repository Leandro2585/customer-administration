import { Hasher } from '@domain/protocols/cryptography'
import { CreateAddressRepository, CreateUserRepository } from '@domain/protocols/repositories'
import { CreateCustomerUsecase } from '@domain/usecases'

export class CreateCustomerFeature implements CreateCustomerUsecase {
	constructor(private readonly userRepository: CreateUserRepository, private readonly addressRepository: CreateAddressRepository, private readonly cypher: Hasher) {}
	async execute({ addresses, birth_date, cpf, email, name, password, phone, rg }: CreateCustomerUsecase.Input): Promise<CreateCustomerUsecase.Output> {
		const formatted_birth_date = new Date(birth_date)
		const hashed_password = await this.cypher.hash({ value: password })
		const { user } = await this.userRepository.create({ cpf, email, name, password: hashed_password, phone, rg, birth_date: formatted_birth_date })
		const address = await Promise.all(addresses.map(async address => {
			const { address: { zipcode, city, district, number, uf } } = await this.addressRepository.create({ ...address, user_id: user.id })
			return `${city}, ${district} Nº${number} - ${uf.toUpperCase()} - ${zipcode}`
		}))
		delete user.password
		return { user, address }
	}
}