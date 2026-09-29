import markdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
export default function (config) {
  const markdown = markdownIt({ html: false, typographer: true }).use(anchor, { permalink: false, slugify: value => value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') });
  config.setLibrary('md', markdown);
  config.addPassthroughCopy('src/assets');
  config.addPassthroughCopy({ 'licenses': 'licenses' });
  config.addFilter('markdown', value => markdown.render(value || ''));
  config.addCollection('stories', api => api.getFilteredByGlob('src/content/stories/*.md').filter(item => !item.data.draft).sort((a,b) => (a.data.order || 99) - (b.data.order || 99)));
  return { dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' }, markdownTemplateEngine: false, htmlTemplateEngine: 'njk', templateFormats: ['md', 'njk'] };
}
