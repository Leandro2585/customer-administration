import { AuthenticationController } from '@application/controllers'
import { makeLoginFeature } from '@main/factories/features'

export const makeAuthenticationController = (): AuthenticationController => {
	const service = makeLoginFeature()
	return new AuthenticationController(service)
}