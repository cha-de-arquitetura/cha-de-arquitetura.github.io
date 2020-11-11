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
export default {
  name: 'Home',
  components: { ArticleCard },
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .without(['body'])
      .limit(8)
      .sortBy('createdAt', 'desc')
      .fetch();

    for (const article of articles) {
      article.author = (await $content('authors')
        .without(['body'])
        .where({ slug: article.author })
        .fetch())[0];
    }

    return {
      articles
    }
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
