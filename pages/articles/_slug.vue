<template>
  <DefaultContent class="max-w-screen-md mx-auto">
    <h1 id="article-title" class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>

    <Tags :article="article" class="mb-2" />

    <div class="flex flex-row justify-between">
      <div>
        <AuthorPreview :article="article" />
      </div>

      <client-only>
        <ShareButton v-if="shareApiEnabled" :article="article"/>

        <div v-else class="flex flex-row items-center">
          <FacebookButton :article="article" class="mr-2" />
          <LinkedInButton :article="article" class="mr-2" />
          <TwitterButton :article="article" class="mr-2" />
          <LinkButton :article="article" />
        </div>
      </client-only>
    </div>

    <hr class="my-4"/>

    <article>
      <nuxt-content :document="article" />
    </article>
  </DefaultContent>
</template>

<script>
import { ResolveContentLocale } from '~/utils/locale';
import { ArticleMetaTags } from '~/utils/head';

export default {
  name: 'BlogIndex',
  nuxtI18n: {
    paths: {
      en: '/articles/:slug',
      pt: '/artigos/:slug'
    }
  },
  async asyncData({ $content, params, app }) {
    const contentPath = `${ResolveContentLocale('articles', app.i18n)}/${params.slug}`;

    const article = await $content(contentPath).fetch();

    const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${article.author}`
    article.author = await $content(authorPath).without(['body', 'text']).fetch();

    return {
      article,
      locale: app.i18n.locale
    };
  },
  head() {
    return {
      title: this.article.title,
      meta: ArticleMetaTags(this.article)
    }
  },
  computed: {
    shareApiEnabled() {
      if (process.client) {
        return window.navigator.share != null;
      }
      return false;
    }
  }
};
</script>
