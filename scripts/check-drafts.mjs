import { mkdtempSync, cpSync, writeFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import Eleventy from '@11ty/eleventy';
const originalCwd = process.cwd();
const configPath = resolve('eleventy.config.js');
const temp = mkdtempSync(join(tmpdir(),'socal-draft-test-'));
try {
  const input=join(temp,'src'), output=join(temp,'_site');
  cpSync('src',input,{recursive:true});
  writeFileSync(join(input,'content/stories/draft-verification.md'), '---\ntitle: Hidden draft verification\ndraft: true\n---\nDo not publish.\n');
  process.chdir(temp);
  const build=new Eleventy('src','_site',{configPath,quietMode:true});
  await build.write();
  if (existsSync(join(output,'stories/draft-verification/index.html'))) throw new Error('Draft page was published');
  for (const page of ['index.html','programs/index.html']) {
    if (readFileSync(join(output,page),'utf8').includes('Hidden draft verification')) throw new Error('Draft appeared in story list');
  }
  console.log('Draft story excluded from output and collections.');
} finally { process.chdir(originalCwd); rmSync(temp,{recursive:true,force:true}); }
