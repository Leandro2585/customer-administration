export interface Hasher {
  hash (input: Hasher.Input): Promise<Hasher.Output>
}

export namespace Hasher {
  export type Input = { value: string }

  export type Output = string
}