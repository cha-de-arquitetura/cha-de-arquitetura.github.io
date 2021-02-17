<template>
  <article class="article">
    <div>
      <h2>
        <nuxt-link :to="localePath(to)">{{ article.title }}</nuxt-link>
      </h2>
      <nuxt-link :to="localePath(to)" class="description">
        {{ article.description }}
      </nuxt-link>
      <Tags :article="article" class="mb-2" />
      <AuthorPreview :article="article" />
    </div>
  </article>
</template>

<script>
import AuthorPreview from '~/components/AuthorPreview';
import Tags from '~/components/tags/Tags';
import { ReadingTime } from '~/utils/date-time';

export default {
  name: 'ArticleCard',
  props: {
    article: Object
  },
  components: {
    AuthorPreview,
    Tags
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

<style lang="scss" scoped>
.article {
  @apply rounded relative p-0.5 bg-gradient-to-tl from-ti-green to-ti-blue;

  >div {
    @apply rounded flex flex-col bg-gray-700 p-3.5 relative w-full h-full;

    h2 {
      @apply text-xl font-bold text-white;
    }

    .description {
      @apply mx-0 my-2 text-sm font-normal text-white flex-grow;
    }
  }
}
</style>
