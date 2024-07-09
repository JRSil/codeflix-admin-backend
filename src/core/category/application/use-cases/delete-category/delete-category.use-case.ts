import { ICategoryRepository } from "src/core/category/domain/category.repository";
import { IUseCase } from "src/core/shared/application/use-case.interface";
import { Uuid } from "src/core/shared/domain/value-objects/uuid.vo";

export class DeleteCategoryUseCase
    implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput> {
    constructor(private categoryRepo: ICategoryRepository) { }

    async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
        const uuid = new Uuid(input.id);
        await this.categoryRepo.delete(uuid);
    };
}

export type DeleteCategoryInput = {
    id: string;
}

type DeleteCategoryOutput = void;
