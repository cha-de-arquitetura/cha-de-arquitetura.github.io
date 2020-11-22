<template>
  <ThreeColumnContent>
    <div id="home-container">
      <div id="articles-grid">
        <ArticleCard
          v-for="article in articles"
          :key="article.slug"
          class="articled-grid-item article"
          :article="article"/>
      </div>
    </div>
  </ThreeColumnContent>
</template>

<script>
import ArticleCard from '@/components/ArticleCard';
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Home',
  components: { ArticleCard },
  async asyncData({ $content, app }) {
    const contentPath = ResolveContentLocale('articles', app.i18n);

    const articles = await $content(contentPath)
      .without(['body'])
      .limit(8)
      .sortBy('createdAt', 'desc')
      .fetch();

    for (const article of articles) {
      const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${article.author}`;
      article.author = await $content(authorPath).without(['body', 'text']).fetch();
    }

    return {
      articles
    }
  },
  head: {
    title: null
  }
};
</script>

<style lang="scss" scoped>
#home-container {
  #articles-grid {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .articled-grid-item {
      width: calc(50% - 32px);
      margin-bottom: 16px;
    }
  }
}
</style>
