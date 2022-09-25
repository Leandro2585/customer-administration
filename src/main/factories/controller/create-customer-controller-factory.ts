import { CreateCustomerController } from '@application/controllers'
import { makeCreateCustomerFeature } from '../features'

export const makeCreateCustomerController = (): CreateCustomerController => {
	const feature = makeCreateCustomerFeature()
	return new CreateCustomerController(feature)
}