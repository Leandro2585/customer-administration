export class NotFoundError extends Error {
	constructor(entity: string) {
		super(`${entity.toLocaleUpperCase()} not found`)
	}
}