export const sitemapEn = {
  gzip: true,
  path: '/sitemap.xml',
  routes: async () => {
    const routes = [];
    routes.push({
      url: '/',
      changefreq: 'daily',
      priority: 1,
      lastmod: (new Date()).toJSON()
    });
    const { $content } = require('@nuxt/content');
    const articles = await $content('articles/en').only(['slug', 'updatedAt']).fetch();
    articles.forEach((article) => {
      routes.push({
        url: `/articles/${article.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: article.updatedAt
      });
    });
    return routes;
  }
};

export const sitemapPt = {
  gzip: true,
  path: '/sitemap-pt.xml',
  filter({ routes }) {
    return routes.filter(route => route.url.startsWith('/pt'));
  },
  routes: async () => {
    const routes = [];
    routes.push({
      url: '/pt',
      changefreq: 'daily',
      priority: 1,
      lastmod: (new Date()).toJSON()
    });
    const { $content } = require('@nuxt/content');
    const articles = await $content('articles/pt').only(['slug', 'updatedAt']).fetch();
    articles.forEach((article) => {
      routes.push({
        url: `/pt/artigos/${article.slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: article.updatedAt
      });
    });
    return routes;
  }
};
