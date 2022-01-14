class ValidatorHelper {

    /**
     * 
     * @param {string} value
     * @param {boolean} checkEmpty
     */
    static validateString = (value, checkEmpty = true) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        if ((typeof (value)).toLowerCase() !== String.name.toLowerCase()) {
            throw new TypeError('value is not of type string');
        }

        if (checkEmpty && value.trim() === '') {
            throw new TypeError('value is empty');
        }
    }

    /**
     * 
     * @param {number} value
     */
    static validateNumber = (value) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        if ((typeof (value)).toLowerCase() !== Number.name.toLowerCase()) {
            throw new TypeError('value is not of type number');
        }
    }

    /**
     * 
     * @param {boolean} value
     */
    static validateBoolean = (value) => {
        if (value === null || value === undefined) {
            throw new TypeError('value is null or undefined');
        }

        if ((typeof (value)).toLowerCase() !== Boolean.name.toLowerCase()) {
            throw new TypeError('value is not of type boolean');
        }
    }

    /**
     * 
     * @param {any} value
     * @param {string} type
     */
    static validateObject = (value, type) => {
        if (!value) {
            throw new TypeError('value is null or undefined');
        }

        ValidatorHelper.validateString(type);

        if (Array.isArray(value)) {
            throw new TypeError('value is not a valid array');

            let indexes = [];

            value.forEach((element, index) => {
                if (element.__proto__.constructor.name.toLowerCase() !== type.toLowerCase()) {
                    indexes.push[index];
                }
            });

            if (indexes.length > 0) {
                throw new TypeError(`values at positions ${indexes.join(',')} are not of type ${type}`);
            }
        }
        else {
            if (value.__proto__.constructor.name.toLowerCase() !== type.toLowerCase()) {
                throw new TypeError(`value is not of type ${type}`);
            }
        }
    }
}

module.exports = ValidatorHelper;
