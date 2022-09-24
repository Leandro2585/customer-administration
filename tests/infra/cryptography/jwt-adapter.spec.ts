import jwt from 'jsonwebtoken'
import { JWTAdapter } from '@infra/cryptography'

jest.mock('jsonwebtoken', () => ({
	async sign (): Promise<string> {
		return 'any_token'
	},
	async verify (): Promise<string> {
		return 'any_value'
	}
}))

describe('jwt adapter', () => {
	let sut: JWTAdapter

	beforeEach(() => {
		sut = new JWTAdapter('secret')
	})

	describe('sign()', () => {
		test('should calls sign with correct values', async () => {
			const signSpy = jest.spyOn(jwt, 'sign')
			await sut.encrypt({ value: 1 })
			expect(signSpy).toHaveBeenCalledWith({ id: 1 }, 'secret')
		})

		test('should return a token on sign success', async () => {
			const { access_token } = await sut.encrypt({ value: 1 })
			expect(access_token).toBe('any_token')
		})

		test('should throw if sign throws', async () => {
			jest.spyOn(jwt, 'sign').mockImplementationOnce(() => Promise.reject(new Error()))
			const promise = sut.encrypt({ value: 1 })
			await expect(promise).rejects.toThrow()
		})
	})

	describe('verify()', () => {
		test('should call verify with correct values', async () => {
			const verifySpy = jest.spyOn(jwt, 'verify')
			await sut.decrypt({ value: 'any_token' })
			expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
		})

		test('should return a value on verify success', async () => {
			const value = await sut.decrypt({ value: 'any_token' })
			expect(value).toBe('any_value')
		})

		test('should throw if verify throws', async () => {
			jest.spyOn(jwt, 'verify').mockImplementationOnce(() => Promise.reject(new Error()))
			const promise = sut.decrypt({ value: 'any_token' })
			await expect(promise).rejects.toThrow()
		})
	})
})