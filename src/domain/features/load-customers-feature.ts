import { FindAllUserRepository } from '@domain/protocols/repositories'
import { LoadCustomersUsecase } from '@domain/usecases'

export class LoadCustomersFeature implements LoadCustomersUsecase {
	constructor(private readonly userRepository: FindAllUserRepository){}
	async execute({ page = 1 }: LoadCustomersUsecase.Input): Promise<LoadCustomersUsecase.Output> {
		const { results, totalCount } = await this.userRepository.findAll({ page })
		return { results, totalCount, page }
	}
}