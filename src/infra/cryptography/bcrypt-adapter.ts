import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '@domain/protocols/cryptography'

export class BCryptAdapter implements Hasher, HashComparer {
	constructor (private readonly salt: number) {}

	async hash ({ value }: Hasher.Input): Promise<Hasher.Output> {
		const hash = await bcrypt.hash(value, this.salt)
		return hash
	}

	async compare (input: HashComparer.Input): Promise<HashComparer.Output> {
		const is_valid = await bcrypt.compare(input.value, input.hashed)
		return is_valid
	}
}