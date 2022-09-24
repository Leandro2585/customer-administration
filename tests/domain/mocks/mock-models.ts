import { UserModel } from '@domain/models'
import { AddressModel } from '@domain/models/address-model'
import { UserEntity } from '@infra/database/entities'

export const mockUser = (): UserModel => ({
	id: 1,
	name: 'any_name',
	email: 'any_mail@mail.com',
	birth_date: new Date(2003, 4, 20),
	cpf: '303.595.000-80',
	rg: '40.236.802-2',
	phone: '(68) 2832-4780',
	address: [mockAddress()],
	password: 'hashed_password'
})

export const mockAddress = (): AddressModel => ({
	id: 1,
	user_id: 1,
	zipcode: '69905-450',
	city: 'Rio Branco',
	uf: 'AC',
	district: 'Cidade Nova',
	number: 316
})

export const mockUserEntity = (): UserEntity => ({
	id: 1,
	name: 'any_name',
	email: 'any_mail@mail.com',
	birth_date: new Date(2003, 4, 20),
	cpf: '303.595.000-80',
	rg: '40.236.802-2',
	phone: '(68) 2832-4780',
	password: 'hashed_password',
	created_at: new Date(2022, 9, 24),
	updated_at: new Date(2022, 9, 24)
})