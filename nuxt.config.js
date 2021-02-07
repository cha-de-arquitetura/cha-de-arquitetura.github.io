import highlightjs from 'highlight.js';
import { sitemapEn, sitemapPt } from './utils/sitemap';
import { globalHead } from './utils/head';

export default {
  target: 'static',
  css: [
    './assets/scss/main.scss',
    'highlight.js/styles/dracula.css',
    './assets/fonts/icomoon/style.css'
  ],
  plugins: [
    './plugins/v-stylish.js',
    './plugins/vue-lazyload.js',
    './plugins/darkmode.client.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss',
    'nuxt-compress',
    '@aceforth/nuxt-optimized-images'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-i18n'
  ],
  content: {
    markdown: {
      remarkPlugins: [
        'remark-footnotes',
        'remark-emoji',
        '@fec/remark-a11y-emoji'
      ],
      highlighter(rawCode, lang) {
        const highlightedCode = highlightjs.highlight(lang, rawCode).value;
        return `<pre class="hljs-container"><code class="hljs ${lang}">${highlightedCode}</code></pre>`;
      }
    }
  },
  build: {},
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { minutes } = require('reading-time')(document.text);

        document.readingTime = minutes;

        if (document.dir.endsWith('pt')) {
          document.locale = 'pt-BR';
          document.url = `https://techissues.dev/pt/artigos/${document.slug}`;
        } else {
          document.locale = 'en-US';
          document.url = `https://techissues.dev/articles/${document.slug}`;
        }
      }
    }
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English'
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        file: 'pt-BR.js',
        name: 'Português'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      alwaysRedirect: false,
      fallbackLocale: 'en',
      onlyOnRoot: true,
      useCookie: false,
      cookieDomain: 'techissues.dev',
      cookieSecure: true
    },
    seo: true
  },
  robots: [
    {
      UserAgent: '*',
      Disallow: [
        '/_nuxt',
        '/.github'
      ]
    },
    {
      Sitemap: 'https://techissues.dev/sitemap.xml'
    }
  ],
  sitemap: {
    path: '/sitemapindex.xml',
    gzip: true,
    hostname: 'https://techissues.dev',
    sitemaps: [sitemapEn, sitemapPt]
  },
  head: globalHead,
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true
  },
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  }
};
