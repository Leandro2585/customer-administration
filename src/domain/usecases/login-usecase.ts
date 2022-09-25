import { UserEntity } from '@infra/database/entities'

export interface LoginUsecase {
  execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output>
}

export namespace LoginUsecase {
  export type Input = { email: string, password: string }

  export type Output = { user: Omit<UserEntity, 'password'>, access_token: string }
}