import formula from 'excel-formula';
import * as esprima from 'esprima';

const convertToJSFormula = (excelFormula) => {
    const jsCode = formula.toJavaScript(excelFormula);

    try {
        // validate js
        const script = esprima.parseScript(jsCode);
    } catch (e) {
        throw new Error(`Excel formula is invalid: ${e.message}`);
    }

    return jsCode;
}

const getIdentifiersInJS = (jsCode) => {
    const script = esprima.parseScript(jsCode, {
        tokens: true
    });

    const identifiers = new Set();

    script.tokens.forEach(token => {
        if (token.type === 'Identifier') {
            if (!identifiers.has(token.value)) {
                identifiers.add(token.value);
            }
        }
    });

    // console.log('tokens', script);
    return Array.from(identifiers);
}


const renameIdentifiersInJS = (jsCode, mapping) => {
    let result = jsCode;
    for (const key in mapping) {
        // console.log('key', key);
        const regExp = new RegExp(`(?!["'])[^A-z0-9](${key})[^A-z0-9](?!["'])`, 'g')
        result = result.replaceAll(regExp, (matched) => {
            return matched.replace(key, mapping[key]);
        });
        // result = result.replaceAll(key, mapping[key]);
    }
    // console.log(mapping);

    return result;
}

export { convertToJSFormula, getIdentifiersInJS, renameIdentifiersInJS };
