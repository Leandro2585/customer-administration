import { AuthenticationController } from '@application/controllers'
import { makeLoginFeature } from '@main/factories/features'

export const makeAuthenticationController = (): AuthenticationController => {
	const feature = makeLoginFeature()
	return new AuthenticationController(feature)
}