import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
    beforeEach(() => {
        Category.prototype.validate = jest
            .fn()
            .mockImplementation(Category.prototype.validate);
    });

    describe('constructor', () => {
        test('should create a category with default values', () => {
            const category = new Category({
                name: "Movie",
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create a category with input values', () => {
            const created_at = new Date();
            const category = new Category({
                name: "Movie",
                description: "Movie description",
                is_active: false,
                created_at: created_at,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        });
    });

    describe('create command', () => {
        test('should create a category', () => {
            const category = Category.create({
                name: "Movie",
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
            expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
            expect(category.notification.hasErrors()).toBe(false);
        });

        test('should create a category with description', () => {
            const category = Category.create({
                name: "Movie",
                description: "Movie description",
            });

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie");
            expect(category.description).toBe("Movie description");
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });

    describe('category_id field', () => {
        const arrange = [
            { category_id: null },
            { category_id: undefined },
            { category_id: new Uuid() },
        ];
        test.each(arrange)('id = %j', (category_id) => {
            const category = new Category({
                name: "Movie",
                category_id: category_id as any,
            });
            // expect(category.category_id).toBeInstanceOf(Uuid);
        });
    });

    test('should change name', () => {
        const category = Category.create({
            name: "Movie",
        });

        category.changeName("Other name");
        expect(category.name).toBe("Other name");
        expect(Category.prototype.validate).toHaveBeenCalledTimes(2);
        expect(category.notification.hasErrors()).toBe(false);
    });

    test('should change description', () => {
        const category = Category.create({
            name: "Movie",
        });

        category.changeDescription("Other description");
        expect(category.description).toBe("Other description");
    });

    test('should activate category', () => {
        const category = Category.create({
            name: "Movie",
            is_active: false,
        });

        category.activate();
        expect(category.is_active).toBeTruthy();
    });

    test('should disable category', () => {
        const category = Category.create({
            name: "Movie",
        });

        category.deactivate();
        expect(category.is_active).toBeFalsy();
    });
});

describe('Category Validator', () => {
    describe('create command', () => {
        test('should be an invalid category with name property', () => {
            const category = Category.create({ name: 't'.repeat(256) });

            expect(category.notification.hasErrors()).toBe(true);
            expect(category.notification).notificationContainsErrorMessages([
                {
                    name: ["name must be shorter than or equal to 255 characters"],
                },
            ]);
        });
    });

    describe('changeName method', () => {
        test('should be an invalid category with name property', () => {
            const category = Category.create({ name: "Movie" });
            category.changeName('t'.repeat(256));

            expect(category.notification.hasErrors()).toBe(true);
            expect(category.notification).notificationContainsErrorMessages([
                {
                    name: ["name must be shorter than or equal to 255 characters"],
                },
            ]);
        });
    });
});
