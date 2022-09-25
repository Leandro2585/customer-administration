import { success } from '@application/helpers'
import { Controller, HttpResponse } from '@application/protocols'
import { LoadCustomersUsecase } from '@domain/usecases'
import { UserEntity } from '@infra/database/entities'

export class LoadCustomersController extends Controller {
	constructor(private readonly loadCustomersUsecase: LoadCustomersUsecase){ super() }
  
	async execute({ page }: LoadCustomersController.Request): Promise<HttpResponse<LoadCustomersController.Response>> {
		const response = await this.loadCustomersUsecase.execute({ page: Number(page) }) 
		return success(response)
	}
  
	validate(): Error | undefined {
		return
	}
}

export namespace LoadCustomersController {
  export type Request = { page: string | number }

  export type Response = { results: UserEntity[], totalCount: number, page: number }
}