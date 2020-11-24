<template>
  <DefaultContent class="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-max">
    <ArticleCard
      v-for="article in articles"
      :key="article.slug"
      :article="article" />
  </DefaultContent>
</template>

<script>
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Home',
  async asyncData({ $content, app }) {
    const contentPath = ResolveContentLocale('articles', app.i18n);

    const articles = await $content(contentPath)
      .without(['body'])
      .sortBy('createdAt', 'desc')
      .fetch();

    for (const article of articles) {
      const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${article.author}`;
      article.author = await $content(authorPath).without(['body', 'text']).fetch();
    }

    return {
      articles
    };
  },
  head: {
    title: null
  }
};
</script>
