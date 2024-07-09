import { IUseCase } from "src/core/shared/application/use-case.interface";
import { CategoryOutput, CategoryOutputMapper } from "../common/category-output";
import { ICategoryRepository } from "src/core/category/domain/category.repository";
import { Uuid } from "src/core/shared/domain/value-objects/uuid.vo";
import { Category } from "src/core/category/domain/category.entity";
import { NotFoundError } from "src/core/shared/domain/errors/not-found.error";

export class GetCategoryUseCase
    implements IUseCase<GetCategoryInput, CategoryOutput> {
    constructor(private categoryRepo: ICategoryRepository) { }

    async execute(input: GetCategoryInput): Promise<CategoryOutput> {
        const uuid = new Uuid(input.id);
        const category = await this.categoryRepo.findById(uuid);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        return CategoryOutputMapper.toOutput(category);
    }
}

export type GetCategoryInput = {
    id: string;
}