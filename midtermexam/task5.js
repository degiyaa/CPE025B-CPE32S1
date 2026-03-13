class ValidationError extends Error {
    constructor(fields) {
        super();
        this.fields = fields;
    }
}

function validateSchema(data, schema) {
    const invalidfield = [];
    for (let key in schema) {
        if (!(key in data) || typeof data[key] !== schema[key]) {
            invalidfield.push(key);
        }
    }
    if (invalidfield.length > 0) {
        throw new ValidationError(invalidfield);
    }
    return true;
}

function safeValidate(data, schema) {
    try {
        validateSchema(data, schema);
        return "Valid";
    } catch (err) {
        if (err instanceof ValidationError) {
            return err.fields.join(", ");
        }
        throw err;
    }
}

// Test Code
const userSchema = {name: 'string', age: 'number', active: 'boolean'};
const userData = {name: 'Alice', age: 'thirty', active: 1};
console.log(safeValidate(userData, userSchema));