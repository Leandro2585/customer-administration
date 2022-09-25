import { LoadCustomersFeature } from '@domain/features'
import { makeUserRepository } from '../repositories'

export const makeLoadCustomersFeature = (): LoadCustomersFeature => {
	const repository = makeUserRepository()
	return new LoadCustomersFeature(repository)
}