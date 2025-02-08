function convertirPitonAPython(codigo) {
    // Reemplazos complejos primero
    let pythonCode = codigo
        .replace(/funcion(.*?):/g, 'def$1:')       // Funciones
        .replace(/si(.*?)entonces:/g, 'if$1:')     // If statements
        .replace(/sino:/g, 'else:')                // Else
        .replace(/para(.*?)en(.*?)hacer:/g, 'for$1in$2:')  // For loops
        .replace(/mientras(.*?)hacer:/g, 'while$1:')       // While loops
        .replace(/imprimir\((.*)\)/g, 'print($1)') // Imprimir
        .replace(/retornar/g, 'return')            // Retornar
        .replace(/fin\s+\w+/g, '')                 // Eliminar 'fin' statements
        .replace(/entonces:/g, ':')                // Eliminar 'entonces'
        .replace(/hacer:/g, ':');                  // Eliminar 'hacer'

    // Diccionario de reemplazos
    const replacements = {
        // Palabras reservadas
        'verdadero': 'True',
        'falso': 'False',
        'nulo': 'None',
        'y': 'and',
        'o': 'or',
        'no': 'not',
        'es': 'is',
        'no es': 'is not',
        
        // Estructuras de datos
        'lista': 'list',
        'tupla': 'tuple',
        'conjunto': 'set',
        'diccionario': 'dict',
        
        // Métodos comunes
        'longitud': 'len',
        'tipo': 'type',
        'rango': 'range',
        'iterar': 'iter',
        'siguiente': 'next',
        'agregar': 'append',
        'eliminar': 'remove',
        'insertar': 'insert',
        'copiar': 'copy',
        
        // Módulos comunes
        'matematicas': 'math',
        'aleatorio': 'random',
        'sistema': 'sys',
        'tiempo': 'time',
        'json': 'json',
        'os': 'os',
        
        // Tipos de datos
        'cadena': 'str',
        'entero': 'int',
        'flotante': 'float',
        'booleano': 'bool',
        
        // Control de errores
        'intentar': 'try',
        'capturar': 'except',
        'finalmente': 'finally',
        'levantar': 'raise',
        
        // Clases
        'clase': 'class',
        'self': 'self',
        
        // Módulos avanzados
        'asincrono': 'async',
        'esperar': 'await',
        'generador': 'yield'
    };

    // Aplicar reemplazos simples
    Object.entries(replacements).forEach(([pit, pyt]) => {
        const regex = new RegExp(`\\b${pit}\\b`, 'g');
        pythonCode = pythonCode.replace(regex, pyt);
    });

    // Limpieza final
    pythonCode = pythonCode
        .replace(/\s+:/g, ':')                     // Eliminar espacios antes de :
        .replace(/:\s*$/gm, ':')                   // Asegurar : al final de línea
        .replace(/(\n){3,}/g, '\n\n')              // Eliminar múltiples líneas vacías
        .replace(/(else|elif|except|finally):/g, '$1:  # type: ignore');

    return pythonCode;
}
