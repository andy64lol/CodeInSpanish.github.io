function convertirPitonAPython(codigo) {
  let pythonCode = codigo
    .replace(/(\n|^)\s*funcion\s+(.*?):/g, '$1def $2:')
    .replace(/si\s+(.*?)\s+entonces:/g, 'if $1:')
    .replace(/sino\s+si\s+(.*?)\s+entonces:/g, 'elif $1:')
    .replace(/sino:/g, 'else:')
    .replace(/para\s+(.*?)\s+en\s+(.*?)\s+hacer:/g, 'for $1 in $2:')
    .replace(/mientras\s+(.*?)\s+hacer:/g, 'while $1:')
    .replace(/imprimir\((.*)\)/g, 'print($1)')
    .replace(/retornar/g, 'return')
    .replace(/(\n|^)\s*fin(\s+\w+)?/g, '')
    .replace(/entonces:/g, ':')
    .replace(/hacer:/g, ':');

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

  Object.entries(replacements).forEach(([pit, pyt]) => {
    const regex = new RegExp(`\\b${pit}\\b`, 'g');
    pythonCode = pythonCode.replace(regex, pyt);
  });

  // Fix indentation
  pythonCode = pythonCode.replace(/(\n)(\s*)(\w)/g, (match, p1, p2, p3) => {
    const indentLevel = p2.length / 2;
    return `${p1}${'  '.repeat(indentLevel)}${p3}`;
  });

  return pythonCode
    .replace(/\s+:/g, ':')
    .replace(/(\n){3,}/g, '\n\n')
    .trim();
}

function convertirPythonAPiton(code) {
  let pitonCode = code
    .replace(/(\n|^)\s*def\s+/g, '$1funcion ')
    .replace(/\breturn\b/g, "retornar")
    .replace(/\bif\b/g, "si")
    .replace(/\belif\b/g, "sino si")
    .replace(/\belse:/g, "sino:")
    .replace(/\bfor\b/g, "para")
    .replace(/\bwhile\b/g, "mientras")
    .replace(/:\s*$/gm, match => {
      if (match.includes('si ') || match.includes('sino')) return ' entonces:';
      if (match.includes('para ') || match.includes('mientras ')) return ' hacer:';
      return ':';
    })
    .replace(/\bin\b/g, "en")
    .replace(/\bis\b/g, "es")
    .replace(/\bis not\b/g, "no es")
    .(/\replacebTrue\b/g, "verdadero")
    .replace(/\bFalse\b/g, "falso")
    .replace(/\bNone\b/g, "nulo");

  return pitonCode
    .replace(/(\n)(\s*)(funcion|si|sino|para|mientras)/g, '\n$2$3')
    .replace(/(\s*)(retornar|imprimir)/g, '\n$1$2')
    .trim();
}
