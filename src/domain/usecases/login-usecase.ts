import { UserModel } from '@domain/models'

export interface LoginUsecase {
  execute(input: LoginUsecase.Input): Promise<LoginUsecase.Output>
}

export namespace LoginUsecase {
  export type Input = { email: string, password: string }

  export type Output = { user: UserModel, access_token: string } | void
}