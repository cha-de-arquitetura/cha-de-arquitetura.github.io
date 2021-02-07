<template>
  <DefaultContent class="max-w-screen-md mx-auto">
    <div class="relative justify-start mt-24 mb-4 p-8 pt-16 w-full bg-primary rounded text-white">
      <div class="inline absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <LazyPhoto
          id="author-photo"
          :src="author.photo"
          alt="Author photo"
          classes="box-content w-28 rounded-full bg-white border-8 md:border-4 border-white"
        />
      </div>

      <h1 class="text-2xl text-center mb-6">{{ author.name }}</h1>

      <p class="mx-auto w-1/2 text-center mb-2 mb-6 font-light">
        {{ author.bio }}
      </p>

      <ul class="social">
        <li v-if="author.social.linkedin">
          <a :href="author.social.linkedin.url" target="_blank">
            <span class="icon-linkedin"/>
          </a>
        </li>
        <li v-if="author.social.twitter">
          <a :href="author.social.twitter.url" target="_blank">
            <span class="icon-twitter"/>
          </a>
        </li>
        <li v-if="author.social.stackoverflow">
          <a :href="author.social.stackoverflow.url" target="_blank" :alt="`${author.name}`">
            <span class="icon-stackoverflow"/>
          </a>
        </li>
        <li v-if="author.social.github">
          <a :href="author.social.github.url" target="_blank">
            <span class="icon-github"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        class="mb-4"/>
    </div>
  </DefaultContent>
</template>

<script>
import { ResolveContentLocale } from '~/utils/locale';

export default {
  name: 'Authors',
  nuxtI18n: {
    paths: {
      en: '/authors/:slug',
      pt: '/autores/:slug'
    }
  },
  async asyncData({ $content, params, app }) {
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

<style lang="scss" scoped>
.social {
  @apply text-center;

  li {
    @apply mx-4 text-center inline-block;

    a {
      @apply inline-block;

      span {
        @apply text-3xl text-white fill-current inline-block;
      }
    }
  }
}
</style>
