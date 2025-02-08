function convertirPitonAPython(codigo) {
  // Normalize line endings and trim the code
  let pythonCode = codigo.replace(/\r\n/g, '\n').trim();

  // Handle function definitions
  pythonCode = pythonCode.replace(/(\n|^)\s*funcion\s+(\w+)\s*\(([^)]*)\)\s*:/g, (match, p1, p2, p3) => {
    return `${p1}def ${p2}(${p3}):`;
  });

  // Handle if, elif, and else statements
  pythonCode = pythonCode.replace(/si\s+(.*?)\s+entonces:/g, 'if $1:');
  pythonCode = pythonCode.replace(/sino\s+si\s+(.*?)\s+entonces:/g, 'elif $1:');
  pythonCode = pythonCode.replace(/sino:/g, 'else:');

  // Handle loops
  pythonCode = pythonCode.replace(/para\s+(.*?)\s+en\s+(.*?)\s+hacer:/g, 'for $1 in $2:');
  pythonCode = pythonCode.replace(/mientras\s+(.*?)\s+hacer:/g, 'while $1:');

  // Handle print statements
  pythonCode = pythonCode.replace(/imprimir\((.*)\)/g, 'print($1)');

  // Handle return statements
  pythonCode = pythonCode.replace(/retornar/g, 'return');

  // Handle logical operators and keywords
  const replacements = {
    'no es': 'is not',
    'es': 'is',
    'verdadero': 'True',
    'falso': 'False',
    'nulo': 'None',
    'y': 'and',
    'o': 'or',
    'no': 'not',
    'lista': 'list',
    'tupla': 'tuple',
    'conjunto': 'set',
    'diccionario': 'dict',
    'longitud': 'len',
    'rango': 'range',
    'iterar': 'iter',
    'siguiente': 'next'
  };

  // Perform replacements in a specific order to avoid conflicts
  const orderedKeys = [
    'no es', 'es', 'verdadero', 'falso', 'nulo', 'y', 'o', 'no',
    'lista', 'tupla', 'conjunto', 'diccionario', 'longitud', 'rango', 'iterar', 'siguiente'
  ];

  orderedKeys.forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    pythonCode = pythonCode.replace(regex, replacements[key]);
  });

  // Remove unnecessary 'fin' statements
  pythonCode = pythonCode.replace(/(\n|^)\s*fin(\s+\w+)?/g, '');

  // Fix indentation (assuming Pitón uses 2 spaces for indentation)
  pythonCode = pythonCode.replace(/(\n)(\s*)/g, (match, p1, p2) => {
    const indentLevel = p2.length / 2; // Assuming each indentation level is 2 spaces
    return `${p1}${'  '.repeat(indentLevel)}`;
  });

  // Clean up extra spaces and newlines
  pythonCode = pythonCode.replace(/\s+:/g, ':');
  pythonCode = pythonCode.replace(/(\n){3,}/g, '\n\n');

  return pythonCode.trim();
}
