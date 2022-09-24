import { UserModel } from '@domain/models'
import { AddressModel } from '@domain/models/address-model'

export const mockUser = (): UserModel => ({
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
	zipcode: '69905-450',
	city: 'Rio Branco',
	uf: 'AC',
	district: 'Cidade Nova',
	country: 'Brasil',
	number: 316
})