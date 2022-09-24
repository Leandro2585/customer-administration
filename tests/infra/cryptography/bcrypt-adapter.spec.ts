import bcrypt from 'bcrypt'
import { BCryptAdapter } from '@infra/cryptography'

jest.mock('bcrypt', () => ({
	async hash (): Promise<string> {
		return new Promise(resolve => resolve('hash'))
	},
	async compare (): Promise<boolean> {
		return new Promise(resolve => resolve(true))
	}
}))


describe('BCrypt Adapter', () => {
	let sut: BCryptAdapter
	const salt = 12
	
	beforeEach(() => {
		sut = new BCryptAdapter(salt)
	})

	describe('hash()', () => {
		test('should call bcrypt with correct values', async () => {
			const hashSpy = jest.spyOn(bcrypt, 'hash')
			await sut.hash({ value: 'any_payload' })
			expect(hashSpy).toHaveBeenCalledWith('any_payload', salt)
		})

		test('should return a valid on hash success', async () => {
			const hash = await sut.hash({ value: 'any_payload' })
			expect(hash).toBe('hash')
		})

		test('should throw if hash throws', async () => {
			jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()))
			const promise = sut.hash({ value: 'any_payload' })
			await expect(promise).rejects.toThrow()
		})
	})

	describe('compare()', () => {
		test('should call compare with correct values', async () => {
			const compareSpy = jest.spyOn(bcrypt, 'compare')
			await sut.compare({ value: 'any_value', hashed: 'any_hashed'})
			expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hashed')
		})

		test('should return true when compare succeeds', async () => {
			const isValid = await sut.compare({ value: 'any_payload', hashed: 'any_hash' })
			expect(isValid).toBe(true)
		})

		test('should return false when compare fails', async () => {
			jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false))
			const isValid = await sut.compare({ value: 'any_payload', hashed: 'any_hash' })
			expect(isValid).toBe(false)
		})

		test('should throw if compare throws', async () => {
			jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.reject(new Error()))
			const promise = sut.compare({ value: 'any_payload', hashed: 'any_hash' })
			await expect(promise).rejects.toThrow()
		})
	})
})