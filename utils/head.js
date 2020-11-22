export const globalHead = {
  titleTemplate(titleChunk) {
    return titleChunk ? `${titleChunk} - Dev T.issues` : 'Dev T.issues';
  },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Tech Issues dot Dev'
    }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.svg'
    }
  ]
};

export const facebookScripts = [
  {
    src: '/fb.js'
  },
  {
    async: true,
    defer: true,
    crossorigin: 'anonymous',
    src: 'https://connect.facebook.net/en_US/sdk.js'
  }
];

export function ArticleMetaTags(article) {
  const metaTags = [
    {
      hid: 'description',
      name: 'description',
      content: article.description
    },
    {
      name: 'og:title',
      property: 'og:title',
      content: article.title
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: article.description
    },
    {
      name: 'og:locale',
      property: 'og:locale',
      content: article.locale
    },
    {
      name: 'og:locale:alternate',
      property: 'og:locale:alternate',
      content: article.locale === 'en_US' ? 'pt_BR' : 'en_US'
    },
    {
      name: 'og:site_name',
      property: 'og:site_name',
      content: 'Dev T.issues'
    },
    {
      name: 'og:url',
      property: 'og:url',
      content: article.url
    },
    {
      name: 'og:type',
      property: 'og:type',
      content: 'article'
    },
    {
      name: 'article:published_time',
      property: 'article:published_time',
      content: article.createdAt
    },
    {
      name: 'article:author',
      property: 'article:author',
      content: article.author.name
    },
    {
      name: 'twitter:card',
      property: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:description',
      property: 'twitter:description',
      content: article.description
    },
    {
      name: 'fb:app_id',
      property: 'fb:app_id',
      content: '2782231188703251'
    }
  ];

  if (article.createdAt !== article.updatedAt) {
    metaTags.push({
      name: 'article:modified_time',
      property: 'article:modified_time',
      content: article.updatedAt
    });
  }

  if (article.section) {
    metaTags.push({
      name: 'article:section',
      property: 'article:section',
      content: article.section
    });
  }

  if (article.tags) {
    article.tags.forEach(tag => {
      metaTags.push({
        name: 'article:tag',
        property: 'article:tag',
        content: tag
      });
    });
  }

  return metaTags;
}
