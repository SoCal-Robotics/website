import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';
import { load } from 'cheerio';
const root = resolve('_site');
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir,entry.name)) : [join(dir,entry.name)]); }
let failures = [];
const files = walk(root).filter(f => f.endsWith('.html'));
for (const file of files) {
  const $ = load(readFileSync(file,'utf8'));
  const url = '/' + file.slice(root.length + 1).replace(/index.html$/, '');
  if ($('h1').length !== 1) failures.push(`${url}: requires exactly one h1`);
  if (!$('title').text() || !$('meta[name="description"]').attr('content')) failures.push(`${url}: missing metadata`);
  if (!$('html[lang="en"]').length) failures.push(`${url}: missing language`);
  const ids = new Set();
  $('[id]').each((_, element) => { const id = $(element).attr('id'); if (ids.has(id)) failures.push(`${url}: duplicate id ${id}`); ids.add(id); });
  $('img').each((_, element) => { if ($(element).attr('alt') === undefined) failures.push(`${url}: missing alt text`); });
  $('a[href], img[src], script[src], link[href]').each((_,element) => {
    const target = $(element).attr('href') || $(element).attr('src');
    if (/^(https?:|mailto:|data:)/.test(target)) return;
    const parsed = new URL(target, `https://example.test${url}`);
    const targetFile = join(root, decodeURIComponent(parsed.pathname), parsed.pathname.endsWith('/') ? 'index.html' : '');
    if (!existsSync(targetFile)) { failures.push(`${url}: missing ${target}`); return; }
    if (parsed.hash && extname(targetFile) === '.html') {
      const other = load(readFileSync(targetFile,'utf8'));
      const found = other('[id]').toArray().some(e => other(e).attr('id') === decodeURIComponent(parsed.hash.slice(1)));
      if (!found) failures.push(`${url}: missing fragment ${target}`);
    }
  });
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Checked ${files.length} pages: internal links, fragments, assets, headings, image alternatives, and metadata passed.`);
