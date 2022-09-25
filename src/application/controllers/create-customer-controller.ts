import { success } from '@application/helpers'
import { Controller, HttpResponse } from '@application/protocols'
import { CreateCustomerUsecase } from '@domain/usecases'
import { UserEntity } from '@infra/database/entities'

export class CreateCustomerController extends Controller {
	constructor(private readonly createCustomerUsecase: CreateCustomerUsecase){ super() }
	async execute({ rg, addresses, birth_date, cpf, email, name, password, phone }: CreateCustomerController.Request): Promise<HttpResponse<CreateCustomerController.Response>> {
		const { address, user } = await this.createCustomerUsecase.execute({ rg, addresses, birth_date, cpf, email, name, password, phone })
		return success({ address, ...user })
	}

	validate(HttpRequest: CreateCustomerController.Request): Error | undefined {
		return
	}
}

export namespace CreateCustomerController {
  export type Request = CreateCustomerUsecase.Input

  export type Response = UserEntity & {
    address: string[],
  }
}