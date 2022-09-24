import { UserModel } from '@domain/models'

export interface FindByEmailUserRepository {
  findByEmail(input: FindByEmailUserRepository.Input): Promise<FindByEmailUserRepository.Output>
}

export namespace FindByEmailUserRepository {
  export type Input = { email: string }

  export type Output = { user: UserModel }
}