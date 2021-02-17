<template>
  <DefaultContent class="author">
    <AuthorDetails :author="author"/>
    <div class="authorArticles">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        class="article"/>
    </div>
  </DefaultContent>
</template>

<script>
import AuthorDetails from '~/pages/authors/components/AuthorDetails';
import ArticleCard from '~/components/ArticleCard';
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Authors',
  components: {
    AuthorDetails,
    ArticleCard
  },
  nuxtI18n: {
    paths: {
      en: '/authors/:slug',
      pt: '/autores/:slug'
    }
  },
  async asyncData({
    $content,
    params,
    app
  }) {
    const authorPath = `${ResolveContentLocale('authors', app.i18n)}/${params.slug}`;

    const author = await $content(authorPath)
      .without(['body', 'text'])
      .fetch();

    const articlesPath = ResolveContentLocale('articles', app.i18n);

    const articles = await $content(articlesPath)
      .without(['body', 'text'])
      .where({ author: author.slug })
      .fetch();

    articles.forEach(article => {
      article.author = author;
    });

    return {
      author,
      articles
    };
  }
};
</script>

<style
  lang="scss"
  scoped>
.author {
  @apply max-w-screen-md mx-auto;

  .authorArticles {
    @apply flex flex-col;

    .article {
      @apply mb-4;
    }
  }
}
</style>
