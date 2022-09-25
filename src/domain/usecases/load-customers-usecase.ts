import { UserEntity } from '@infra/database/entities'

export interface LoadCustomersUsecase {
  execute(input: LoadCustomersUsecase.Input): Promise<LoadCustomersUsecase.Output>
}

export namespace LoadCustomersUsecase {
  export type Input = { page?: number }

  export type Output = { page: number, totalCount: number, results: UserEntity[] }
}