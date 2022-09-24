import jwt from 'jsonwebtoken'
import { Decrypter, Encrypter } from '@domain/protocols/cryptography'

export class JWTAdapter implements Encrypter, Decrypter {
	constructor (private readonly secret: string) {}

	async encrypt (input: Encrypter.Input): Promise<Encrypter.Output> {
		const access_token = await jwt.sign({ id: input.value }, this.secret)
		return { access_token }
	}

	async decrypt (input: Decrypter.Input): Promise<Decrypter.Output> {
		const value: any = await jwt.verify(input.value, this.secret)
		return value
	}
}