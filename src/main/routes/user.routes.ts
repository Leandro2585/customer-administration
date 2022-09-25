import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeAuthenticationController, makeCreateCustomerController, makeLoadCustomersController } from '@main/factories/controller'

export default (router: Router): void => {
	router.post('/login', adaptRoute(makeAuthenticationController()))
	router.post('/customer', adaptRoute(makeCreateCustomerController()))
	router.get('/customer', adaptRoute(makeLoadCustomersController()))
}