
export interface Decrypter {
  decrypt (input: Decrypter.Input): Promise<Decrypter.Output>;
}

export namespace Decrypter {
  export type Input = { value: string }

  export type Output = string
}