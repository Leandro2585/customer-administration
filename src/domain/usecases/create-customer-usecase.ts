import { UserModel } from '@domain/models'
import { UserEntity } from '@infra/database/entities'

export interface CreateCustomerUsecase {
  execute(input: CreateCustomerUsecase.Input): Promise<CreateCustomerUsecase.Output>
}

export namespace CreateCustomerUsecase {
  export type Input = {
    name: string
    email: string
    birth_date: string
    cpf: string
    rg: string
    phone: string
    addresses: {
      uf: string
      city: string
      district: string
      zipcode: string
      number: number
    }[]
    password: string
  }

  export type Output = { user: UserEntity, address: string[] }
}