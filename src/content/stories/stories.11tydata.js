export default {
  layout: 'layouts/story.njk',
  eleventyComputed: {
    permalink: data => data.draft ? false : `/stories/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: data => Boolean(data.draft)
  }
};
