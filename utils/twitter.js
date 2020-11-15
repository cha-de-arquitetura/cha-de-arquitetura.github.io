export function CreateShareURL(article, locale) {
  let baseUrl = `https://twitter.com/intent/tweet?&original_referer=${article.url}&url=${article.url}`;

  if (article.tags) {
    const tags = article.tags.map(tag => {
      return tag.split('-').map((t, i) => {
        return t.charAt(0).toUpperCase() + t.substr(1);
      }).join('');
    });
    baseUrl += `&hashtags=${tags.join(',')}`
  }

  baseUrl += `&title=${article.title}`;
  baseUrl += `&summary=${article.description}`;

  return baseUrl;
}
