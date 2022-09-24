import { AddressModel } from './address-model'

export type UserModel = {
  id: number
  name: string
  email: string
  birth_date: Date
  cpf: string
  rg: string
  phone: string
  address: AddressModel[]
  password: string
}