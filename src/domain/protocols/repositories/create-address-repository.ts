import { AddressModel } from '@domain/models/address-model'
import { AddressEntity } from '@infra/database/entities'

export interface CreateAddressRepository {
  create(input: CreateAddressRepository.Input): Promise<CreateAddressRepository.Output>
}

export namespace CreateAddressRepository {
  export type Input = AddressModel

  export type Output = { address: AddressEntity }
}