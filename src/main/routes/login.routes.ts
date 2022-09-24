import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeAuthenticationController } from '@main/factories/controller'

export default (router: Router): void => {
	router.post('/login', adaptRoute(makeAuthenticationController()))
}