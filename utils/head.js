export const globalHead = {
  title: 'Dev T.issues',
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
      property: 'og:title',
      content: article.title
    },
    {
      property: 'og:description',
      content: article.description
    },
    {
      property: 'og:locale',
      content: article.locale
    },
    {
      property: 'og:locale:alternate',
      content: article.locale === 'en_US' ? 'pt_BR' : 'en_US'
    },
    {
      property: 'og:site_name',
      content: 'Dev T.issues'
    },
    {
      property: 'og:url',
      content: article.url
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'article:published_time',
      content: article.createdAt
    },
    {
      property: 'article:author',
      content: article.author.name
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:description',
      content: article.description
    },
    {
      property: 'fb:app_id',
      content: '2782231188703251'
    }
  ];

  if (article.createdAt !== article.updatedAt) {
    metaTags.push({
      property: 'article:modified_time',
      content: article.updatedAt
    });
  }

  if (article.section) {
    metaTags.push({
      property: 'article:section',
      content: article.section
    });
  }

  if (article.tags) {
    article.tags.forEach(tag => {
      metaTags.push({
        property: 'article:tag',
        content: tag
      });
    });
  }

  return metaTags;
}
