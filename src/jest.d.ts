import { FieldsErrors } from "./shared/domain/validators/validators-field-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldsErrors) => R;
        }
    }
}
