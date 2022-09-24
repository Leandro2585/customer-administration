export class NotFoundError extends Error {
	constructor(entity: string) {
		super(`${entity.toLocaleUpperCase()} not found`)
	}
}

export class IncorrectPasswordError extends Error {
	constructor() {
		super('Incorrect password')
		this.name = 'IncorrectPasswordError'
	}
}