<template>
  <article class="grid gap-0 auto-rows-min bg-gray-100 rounded p-4">
    <h2 class="text-xl font-bold text-gray-900">
      <nuxt-link :to="localePath(to)">{{ article.title }}</nuxt-link>
    </h2>
    <nuxt-link :to="localePath(to)" class="mx-0 my-2 text-sm font-normal text-gray-800">
      {{ article.description }}
    </nuxt-link>
    <Tags :article="article" class="mb-2" />
    <AuthorPreview :article="article" />
  </article>
</template>

<script>
import { ReadingTime } from '~/utils/date-time';

export default {
  name: 'ArticleCard',
  props: {
    article: Object
  },
  computed: {
    to({ article }) {
      return {
        name: 'articles-slug',
        params: {
          slug: article.slug
        }
      }
    },
    readingTime({ article }) {
      return {
        readingTime: ReadingTime(article.readingTime)
      };
    }
  }
};
</script>
