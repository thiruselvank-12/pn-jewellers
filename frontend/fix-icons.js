import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

const mappings = {
  'HiBars3': 'HiMenu',
  'HiXMark': 'HiX',
  'HiArrowRightOnRectangle': 'HiLogout',
  'HiCog6Tooth': 'HiCog',
  'HiAdjustmentsHorizontal': 'HiAdjustments',
  'HiCheckBadge': 'HiBadgeCheck',
  'HiEnvelope': 'HiMail',
  'react-icons/hi2': 'react-icons/hi'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  if (content.includes('react-icons/hi2')) {
    for (const [hi2, hi] of Object.entries(mappings)) {
      content = content.replace(new RegExp(hi2, 'g'), hi);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  }
});

console.log('Icon mapping complete.');
