/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */

export function trimSymbols(string, size) {
    if (size === 0) {
        return '';
    }

    if (size === undefined) {
        return string;
    }

    let repeatCount = 0;
    const resultArray = [];

    for (const char of string) {
        if (
            resultArray[resultArray.length - 1] !==
            char
        ) {
            resultArray.push(char);
            repeatCount = 1;
        } else if (repeatCount < size) {
            resultArray.push(char);
            repeatCount++;
        }
    }

    return resultArray.join('');
}

export function trimSymbols(string, size) {
    if (size === 0) {
        return '';
    }

    if (size === undefined) {
        return string;
    }

    const chunk = string.slice(0, size);
    const rest = [...string.slice(size)];

    return rest.reduce((accumulator, char) => {
        if (!accumulator.endsWith(char.repeat(size))) {
            accumulator += char;
        }

        return accumulator;
    }, chunk);
}

export function trimSymbols(string, size) {
    return string.replace(/(.)\1*/g, chunk =>
        chunk.slice(0, size)
    );
}
