const fs = require('fs-extra');
const concat = require('concat');
const path = require('path');

(async function build() {
  const distPath = './dist/hello-widget/browser';
  
  // Verifica che la cartella esista
  if (!fs.existsSync(distPath)) {
    console.error('❌ Errore: cartella dist non trovata!');
    console.log('   Percorso cercato:', path.resolve(distPath));
    return;
  }

  // Trova tutti i file JS (escludendo i chunk che iniziano con 'chunk-')
  const allFiles = fs.readdirSync(distPath)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => {
      // Assicurati che polyfills venga prima di main
      if (a.includes('polyfills')) return -1;
      if (b.includes('polyfills')) return 1;
      if (a.includes('main')) return -1;
      if (b.includes('main')) return 1;
      return 0;
    });

  const files = allFiles.map(file => path.join(distPath, file));

  console.log('📦 File trovati da concatenare:');
  files.forEach(f => console.log('   -', path.basename(f)));

  // Crea la cartella elements
  await fs.ensureDir('elements');
  
  // Concatena tutti i file
  await concat(files, 'elements/hello-widget.js');
  
  const stats = fs.statSync('elements/hello-widget.js');
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  
  console.log(`\n✅ Web Component creato: elements/hello-widget.js`);
  console.log(`📊 Dimensione: ${fileSizeInKB} KB`);
})();