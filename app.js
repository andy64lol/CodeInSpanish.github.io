const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const convertButton = document.getElementById('convertButton');
const saveNativeButton = document.getElementById('saveNativeButton');
const saveConvertedButton = document.getElementById('saveConvertedButton');
const invertButton = document.getElementById('invertButton');
const backButton = document.getElementById('backButton');
const loadButton = document.getElementById('loadButton');
const fileInput = document.getElementById('fileInput');

let currentMode = "ptn";

function updateLineNumbers() {
  const lines = editor.value.split('\n').length;
  document.getElementById('lineNumbers').innerHTML = Array(lines)
    .fill()
    .map((_, i) => i + 1)
    .join('<br>');
}

function convertCode() {
  preview.textContent = currentMode === "ptn" 
    ? convertirPitonAPython(editor.value)
    : convertirPythonAPiton(editor.value);
}

function saveFile(extension) {
  const content = extension === (currentMode === "ptn" ? "ptn" : "py")
    ? editor.value
    : preview.textContent;
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `main.${extension}`;
  a.click();
  URL.revokeObjectURL(url);
}

function updateUI() {
  document.getElementById('editorHeader').textContent = 
    `main.${currentMode === "ptn" ? "ptn" : "py"}`;
    
  document.getElementById('previewHeader').textContent = 
    `${currentMode === "ptn" ? "Python" : "Pitón"} Code`;
    
  convertButton.textContent = 
    `Convertir a ${currentMode === "ptn" ? "Python" : "Pitón"}`;
    
  saveNativeButton.textContent = 
    `Guardar .${currentMode === "ptn" ? "ptn" : "py"}`;
    
  saveConvertedButton.textContent = 
    `Guardar .${currentMode === "ptn" ? "py" : "ptn"}`;
}

function invertConversion() {
  currentMode = currentMode === "ptn" ? "py" : "ptn";
  [editor.value, preview.textContent] = [preview.textContent, editor.value];
  updateUI();
  updateLineNumbers();
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    editor.value = e.target.result;
    currentMode = file.name.endsWith('.ptn') ? 'ptn' : 'py';
    updateUI();
    convertCode();
    updateLineNumbers();
  };
  reader.readAsText(file);
}

editor.addEventListener('input', updateLineNumbers);
convertButton.addEventListener('click', convertCode);
saveNativeButton.addEventListener('click', () => saveFile(currentMode === "ptn" ? "ptn" : "py"));
saveConvertedButton.addEventListener('click', () => saveFile(currentMode === "ptn" ? "py" : "ptn"));
invertButton.addEventListener('click', invertConversion);
backButton.addEventListener('click', () => window.location.href = 'index.html');
loadButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) handleFile(file);
});

updateUI();
updateLineNumbers();
convertCode();
