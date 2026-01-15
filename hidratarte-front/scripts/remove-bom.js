// scripts/remove-bom.js
// Recorre el workspace y elimina BOM UTF-8 (0xEF,0xBB,0xBF) de archivos con extensiones: js, jsx, ts, tsx, css, html
// Úsalo desde la raíz del frontend: node scripts/remove-bom.js

const fs = require('fs');
const path = require('path');

const exts = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html'];

function walk(dir){
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for(const ent of entries){
    const full = path.join(dir, ent.name);
    if(ent.isDirectory()){
      if(ent.name === 'node_modules' || ent.name === '.git') continue;
      walk(full);
      continue;
    }
    if(!exts.includes(path.extname(ent.name))) continue;
    try{
      const buf = fs.readFileSync(full);
      if(buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF){
        fs.writeFileSync(full, buf.slice(3));
        console.log('Removed BOM:', full);
      }
    } catch(e){
      console.error('Error reading', full, e.message);
    }
  }
}

walk(process.cwd());
console.log('Done');
