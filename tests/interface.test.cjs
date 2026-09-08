const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const features = fs.readFileSync(path.join(root, 'features.js'), 'utf8');

test('primary navigation links to the news feed and keeps saves in profile', () => {
  assert.match(html, /data-route="news-feed"/);
  assert.doesNotMatch(html, /class="nav-item" data-route="saved"/);
  assert.match(app, /<h2>ذخیره‌های من<\/h2>/);
});

test('Persian-only interface has no language switch', () => {
  assert.doesNotMatch(html + app + features, /data-language/);
  assert.match(app, /language:'fa'/);
  assert.match(html, /<title>استرالیای ما<\/title>/);
});

test('news filters do not include events', () => {
  assert.match(features, /\['all','local','community','economy'\]/);
  assert.doesNotMatch(features, /\['all','events','city','culture'\]/);
});
