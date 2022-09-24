export class ServerError extends Error {
	constructor(error?: Error) {
		super(error?.message ? error.message : 'Server failed. Try again soon')
		this.name = 'ServerError'
		this.stack = error?.stack
	}
}

export class UnauthorizedError extends Error {
	constructor () {
		super('Unauthorized')
		this.name = 'UnauthorizedError'
	}
}


export class RequiredFieldError extends Error {
	constructor(fieldName: string) {
		super(`Missing ${fieldName} field, but it is required`)
		this.name = 'RequiredFieldError'
	}
}