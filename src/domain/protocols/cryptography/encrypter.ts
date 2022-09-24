export interface Encrypter {
  encrypt (input: Encrypter.Input): Promise<Encrypter.Output>;
}

export namespace Encrypter {
  export type Input = { value: string | number }

  export type Output = { access_token: string }
}