function convertirPitonAPython(customCode) {
    const replacements = {
        'funcion': 'def',
        'fin funcion': '',
        'si': 'if',
        'entonces': '',
        'sino': 'else',
        'fin si': '',
        'para': 'for',
        'en': 'in',
        'hacer': '',
        'fin hacer': '',
        'mientras': 'while',
        'fin mientras': '',
        'retornar': 'return',
        'imprimir': 'print',
        'verdadero': 'True',
        'falso': 'False',
        'nulo': 'None',
        'y': 'and',
        'o': 'or',
        'no': 'not',
        'es': 'is',
        'no es': 'is not',
        'intentar': 'try',
        'capturar': 'except',
        'finalmente': 'finally',
        'levantar': 'raise',
        'clase': 'class',
        'importar': 'import',
        'desde': 'from',
        'longitud': 'len',
        'tipo': 'type',
        'rango': 'range',
        'cadena': 'str',
        'entero': 'int',
        'flotante': 'float',
        'lista': 'list',
        'diccionario': 'dict'
    };

    let pythonCode = customCode;
    
    Object.entries(replacements).forEach(([pit, pyt]) => {
        const regex = new RegExp(`\\b${pit}\\b`, 'g');
        pythonCode = pythonCode.replace(regex, pyt);
    });

    pythonCode = pythonCode
        .replace(/entonces:/g, ':')
        .replace(/hacer:/g, ':')
        .replace(/fin\s+(\w+)/g, '')
        .replace(/(\s*):\s*$/gm, '$1')
        .replace(/importar (\w+)/g, 'import $1');

    return pythonCode;
}

window.convertirPitonAPython = convertirPitonAPython;
