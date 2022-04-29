/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path = '') {
    const chunks = path.split('.');

    return obj =>
        chunks.reduce(
            (accumulator, chunk) =>
                accumulator?.[chunk],
            obj
        );
}

export function createGetter(path = '') {
    const chunks = path.split('.');

    return obj => {
        let accumulator = obj;
        for (const chunk of chunks) {
            accumulator = accumulator?.[chunk];

            if (!accumulator) {
                return;
            }
        }

        return accumulator;
    };
}

export function createGetter(path) {
    const chunks = path.split('.');

    return obj => {
        const getValue = index => {
            if (
                index === chunks.length ||
                obj === undefined
            ) {
                return obj;
            }

            obj = obj[chunks[index]];

            return getValue(index + 1);
        };

        return getValue(0);
    };
}
