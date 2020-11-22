import highlightjs from 'highlight.js';
import { sitemapPt, sitemapEn } from './utils/sitemap';
import { globalHead } from './utils/head';

export default {
  target: 'static',
  css: [
    './assets/scss/main.scss',
    'highlight.js/styles/androidstudio.css'
  ],
  plugins: [
    './plugins/v-stylish.js'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss'
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
        return `<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`
      }
    }
  },
  build: {},
  styleResources: {
    scss: './assets/scss/vars/*.scss'
  },
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { minutes } = require('reading-time')(document.text);

        document.readingTime = minutes;
        document.url = `https://techissues.dev${document.path}`;

        if (document.dir.endsWith('pt')) {
          document.locale = 'pt_BR';
        } else {
          document.locale = 'en_US';
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
  head: globalHead
};
