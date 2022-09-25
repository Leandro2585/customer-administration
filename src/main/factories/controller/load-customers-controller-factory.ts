import { LoadCustomersController } from '@application/controllers'
import { makeLoadCustomersFeature } from '@main/factories/features'

export const makeLoadCustomersController = (): LoadCustomersController =>  {
	const service = makeLoadCustomersFeature()
	return new LoadCustomersController(service)
}