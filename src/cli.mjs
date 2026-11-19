import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { lintFrontendCode } from './linter.mjs';

export async function runCli(argv) {
  const args = argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'scan': {
      const targetDir = args[1] || '.';
      if (!fs.existsSync(targetDir)) {
        console.error(`Target path "${targetDir}" not found.`);
        process.exit(1);
      }

      const files = findFiles(targetDir).filter(f => /\.(jsx|tsx|html|vue|svelte|astro|php)$/i.test(f));
      if (files.length === 0) {
        console.log('No frontend files found to scan.');
        process.exit(0);
      }

      console.log(`Scanning ${files.length} file(s) for AI code slop...\n`);
      let hasErrors = false;

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const report = lintFrontendCode(content);

        if (report.totalIssues > 0) {
          if (!report.clean) hasErrors = true;
          console.log(`[SLOP DETECTED] ${file}`);
          report.issues.forEach(iss => {
            const tag = iss.severity === 'error' ? 'ERR' : 'WARN';
            console.log(`  - L${iss.line} [${tag}][${iss.rule}] ${iss.message}`);
          });
          console.log('');
        }
      }

      if (hasErrors) {
        console.log('Scan failed. Please resolve critical AI code defects.');
        process.exit(1);
      } else {
        console.log('All frontend files passed anti-slop checks.');
        process.exit(0);
      }
      break;
    }

    case 'help':
    default: {
      console.log(`
anti-slop-linter - Quality & Aesthetic Linter for AI-Generated Frontend Code

Usage:
  anti-slop scan <directory>    Scan frontend files for design slop & leaks
  anti-slop help                Show this guidance
      `.trim());
      process.exit(0);
    }
  }
}

function findFiles(dir) {
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) return [dir];

  let list = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.git') continue;
    const full = path.join(dir, entry);
    const s = fs.statSync(full);
    if (s.isDirectory()) {
      list = list.concat(findFiles(full));
    } else {
      list.push(full);
    }
  }
  return list;
}
