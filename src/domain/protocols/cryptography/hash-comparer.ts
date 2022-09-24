export interface HashComparer {
  compare(input: HashComparer.Input): Promise<HashComparer.Output>;
}

export namespace HashComparer {
  export type Input = { value: string, hashed: string }
  
  export type Output = boolean
}