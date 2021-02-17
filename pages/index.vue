<template>
  <DefaultContent class="home">
    <ArticleCard :article="lastArticle" class="col-span-full" />
    <ArticleCard
      v-for="article in articles"
      :key="article.slug"
      :article="article"/>
  </DefaultContent>
</template>

<script>
import ArticleCard from '~/components/ArticleCard';
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Home',
  components: {
    ArticleCard
  },
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

    // while (articles.length < 20) {
    //   articles.push({
    //     ...articles[0],
    //     slug: articles.length + 1
    //   })
    // }

    const lastArticle = articles.shift();

    return {
      articles,
      lastArticle
    };
  },
  head: {
    title: null
  }
};
</script>

<style
  lang="scss"
  scoped>
.home {
  @apply max-w-screen-lg mx-auto grid grid-cols-1 gap-4 auto-rows-max;
}

@screen lg {
  .home {
    @apply grid-cols-2;
  }
}
</style>
