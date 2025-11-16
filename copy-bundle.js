const fs = require('fs-extra');
const path = require('path');

(async function() {
  const distPath = './dist/hello-widget';
  const sourceFiles = [
    path.join(distPath, 'polyfills.js'),
    path.join(distPath, 'main.js')
  ];
  
  const targetDir = './elements';
  const targetFile = path.join(targetDir, 'hello-widget.js');

  // Verifica che i file esistano
  for (let file of sourceFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ File non trovato: ${file}`);
      return;
    }
  }

  // Crea directory elements
  await fs.ensureDir(targetDir);

  // Leggi e concatena i file
  let bundleContent = '';
  for (let file of sourceFiles) {
    const content = await fs.readFile(file, 'utf8');
    bundleContent += content + '\n';
  }

  // Scrivi il bundle
  await fs.writeFile(targetFile, bundleContent);

  const stats = fs.statSync(targetFile);
  console.log(`\n✅ Web Component creato: elements/hello-widget.js`);
  console.log(`📊 Dimensione: ${(stats.size / 1024).toFixed(2)} KB\n`);
})();