class ValidatorHelper {

    static validateString = (value, checkEmpty = true) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        if (typeof (value) !== String.name.toLowerCase()) {
            throw new TypeError('value is not of type string');
        }

        if (checkEmpty && value.trim() === '') {
            throw new TypeError('value is empty');
        }
    }

    static validateNumber = (value) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        if (typeof (value) !== Number.name.toLowerCase()) {
            throw new TypeError('value is not of type number');
        }
    }

    static validateBoolean = (value) => {
        if (value === null || value === undefined) {
            throw new TypeError('value is null or undefined');
        }

        if (typeof (value) !== Boolean.name.toLowerCase()) {
            throw new TypeError('value is not of type boolean');
        }
    }

    static validateObject = (value, type) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        ValidatorHelper.validateString(type);

        if (Array.isArray(value)) {
            throw new TypeError('value is not a valid array');

            let indexes = [];

            value.forEach((element, index) => {
                if (typeof (element) !== type.toLowerCase()) {
                    indexes.push[index];
                }
            });

            if (indexes.length > 0) {
                throw new TypeError(`values at positions ${indexes.join(',')} are not of type ${type}`);
            }
        }
        else {
            if (typeof (value) !== type.toLowerCase()) {
                throw new TypeError(`value is not of type ${type}`);
            }
        }
    }
}

module.exports = ValidatorHelper;
