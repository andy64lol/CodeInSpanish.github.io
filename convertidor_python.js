// converter.js

// Function to convert Pitón code to Python code
function convertirPitonAPython(codigo) {
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

  const replacements = {
    'verdadero': 'True',
    'falso': 'False',
    'nulo': 'None',
    'y': 'and',
    'o': 'or',
    'no': 'not',
    'es': 'is',
    'no es': 'is not',
    'lista': 'list',
    'tupla': 'tuple',
    'conjunto': 'set',
    'diccionario': 'dict',
    'longitud': 'len',
    'tipo': 'type',
    'rango': 'range',
    'iterar': 'iter',
    'siguiente': 'next',
    'agregar': 'append',
    'eliminar': 'remove',
    'insertar': 'insert',
    'copiar': 'copy',
    'matematicas': 'math',
    'aleatorio': 'random',
    'sistema': 'sys',
    'tiempo': 'time',
    'json': 'json',
    'os': 'os',
    'cadena': 'str',
    'entero': 'int',
    'flotante': 'float',
    'booleano': 'bool',
    'intentar': 'try',
    'capturar': 'except',
    'finalmente': 'finally',
    'levantar': 'raise',
    'clase': 'class',
    'self': 'self',
    'asincrono': 'async',
    'esperar': 'await',
    'generador': 'yield'
  };

  Object.entries(replacements).forEach(([pit, pyt]) => {
    const regex = new RegExp(`\\b${pit}\\b`, 'g');
    pythonCode = pythonCode.replace(regex, pyt);
  });

  pythonCode = pythonCode
    .replace(/\s+:/g, ':')                     // Eliminar espacios antes de :
    .replace(/:\s*$/gm, ':')                   // Asegurar : al final de línea
    .replace(/(\n){3,}/g, '\n\n')              // Eliminar múltiples líneas vacías
    .replace(/(else|elif|except|finally):/g, '$1:  # type: ignore');

  return pythonCode;
}

// Function to convert Python code to Pitón code
function convertirPythonAPiton(code) {
  return code
    .replace(/def/g, "funcion")
    .replace(/return/g, "retornar")
    .replace(/if /g, "si ")
    .replace(/else:/g, "sino:")
    .replace(/:/g, " entonces:")
    + "\nfin funcion";
}

// Export the functions for use in other files
export { convertirPitonAPython, convertirPythonAPiton };
