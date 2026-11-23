#!/usr/bin/env node
// Builds the prototype from prototype/src into two files:
//   prototype/dist/partpark.html        page fragment published as a claude.ai artifact (libraries from CDN)
//   prototype/partpark-prototyp.html    standalone file: libraries inlined, no network requests, opens from disk
// Replacements use functions on purpose: the inserted code contains "$", which String.replace would interpret.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PROTO = path.join(ROOT, 'prototype');
const SRC = path.join(PROTO, 'src');
const NM = path.join(ROOT, 'node_modules');
const read = (f) => fs.readFileSync(f, 'utf8');
const count = (s, part) => s.split(part).length - 1;

// 1. page fragment: markup and styles + application code + fonts for the PDF
const b64 = (f) => fs.readFileSync(path.join(SRC, 'fonts', f)).toString('base64');
let app = read(path.join(SRC, 'app.js'));
app = app.replace('/*__FONT_R__*/', () => b64('DejaVuSans-subset.ttf')).replace('/*__FONT_B__*/', () => b64('DejaVuSans-Bold-subset.ttf'));
if (app.includes('</script')) throw new Error('app.js must not contain "</script"');
const page = read(path.join(SRC, 'page.html'));
if (count(page, '/*__APP__*/') !== 1) throw new Error('page.html must contain /*__APP__*/ exactly once');
const fragment = page.replace('/*__APP__*/', () => app);
fs.mkdirSync(path.join(PROTO, 'dist'), { recursive: true });
fs.writeFileSync(path.join(PROTO, 'dist', 'partpark.html'), fragment);

// 2. standalone file: inline the libraries, drop web fonts, add the document skeleton
const libs = {
  'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js': 'three/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js': 'three/examples/js/controls/OrbitControls.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js': 'jspdf/dist/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js': 'jszip/dist/jszip.min.js',
};
let html = fragment;
for (const [url, file] of Object.entries(libs)) {
  const tag = `<script src="${url}"></script>`;
  if (count(html, tag) !== 1) throw new Error('expected exactly one script tag for ' + url);
  const code = read(path.join(NM, file))
    .replace(/<\/(script)/gi, '<\\/$1')
    .replace(/\n\/\/# sourceMappingURL=.*/g, '');
  html = html.replace(tag, () => '<script>\n' + code + '\n</script>');
}
const cut = html.indexOf('</style>') + '</style>'.length;
let head = html.slice(0, cut);
const body = html.slice(cut);
head = head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '');
const fontLinks = /<link [^>]*fonts\.(googleapis|gstatic)\.com[^>]*>\n?/g;
const found = (head.match(fontLinks) || []).length;
if (found !== 3) throw new Error('expected 3 web font links, found ' + found);
head = head.replace(fontLinks, '');
const standalone = `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>html{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(PROTO, 'partpark-prototyp.html'), standalone);
console.log(`dist/partpark.html ${fragment.length} znaków · partpark-prototyp.html ${standalone.length} znaków`);
