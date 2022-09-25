import { UserModel } from '@domain/models'
import { UserEntity } from '@infra/database/entities'

export interface CreateUserRepository {
  create(input: CreateUserRepository.Input): Promise<CreateUserRepository.Output>
}

export namespace CreateUserRepository {
  export type Input = UserModel
  
  export type Output = { user: UserEntity }
}