import { UserEntity } from '@infra/database/entities'

export interface FindByEmailUserRepository {
  findByEmail(input: FindByEmailUserRepository.Input): Promise<FindByEmailUserRepository.Output>
}

export namespace FindByEmailUserRepository {
  export type Input = { email: string }

  export type Output<Entity = any> = { user: Entity | undefined }
}

export interface FindAllUserRepository {
  findAll(input: FindAllUserRepository.Input): Promise<FindAllUserRepository.Output>
}

export namespace FindAllUserRepository {
  export type Input = { page: number }

  export type Output = { totalCount: number, results: UserEntity[] }
}