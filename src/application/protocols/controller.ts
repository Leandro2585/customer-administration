import { badRequest, serverError, unauthorized } from '@application/helpers'
import { HttpResponse } from '@application/protocols'
import { IncorrectPasswordError } from '@domain/errors'

interface IController {
  execute(httpRequest: any): Promise<HttpResponse>
  handle(httpRequest: any): Promise<HttpResponse>
  validate(httpRequest: any): Error | undefined
}

export abstract class Controller implements IController {
	abstract execute(httpRequest: any): Promise<HttpResponse>
  abstract validate(httpRequest: any): Error | undefined

  async handle(httpRequest: any): Promise<HttpResponse> {
  	const error = this.validate(httpRequest)
  	if (error !== undefined) {
  		return badRequest(error)
  	}
  	try {
  		return await this.execute(httpRequest)
  	} catch (error) {
  		if(error instanceof IncorrectPasswordError) {
  			return unauthorized(error)
  		}
  		return serverError(error)
  	}
  }
}